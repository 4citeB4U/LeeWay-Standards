/*
LEEWAY HEADER — DO NOT REMOVE

DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

REGION: MCP.AGENT.ENDPOINT
TAG: MCP.ENDPOINT.AGENT.MAIN

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#0DFF94
PASTEL=#C7FFD8

ICON_ASCII:
family=lucide
glyph=globe

5WH:
WHAT = Endpoint agent — detects existing health and HTTP endpoints safely
WHY = Prevents duplicate endpoint registration and detects port conflicts before startup
WHO = Rapid Web Development
WHERE = src/agents/mcp/endpoint-agent.js
WHEN = 2026
HOW = Reads manifest files and scans source for endpoint declarations

AGENTS:
ENDPOINT
TRANSPORT
PORT

LICENSE:
MIT
*/

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ENDPOINT_PATTERNS = [
  { type: 'express', pattern: /\b(?:app|router)\.(get|post|put|delete|patch|head|options)\s*\(\s*['"`]([^'"`]+)['"`]/g },
  { type: 'fastify', pattern: /\bfastify\.(get|post|put|delete|patch|head|options)\s*\(\s*['"`]([^'"`]+)['"`]/g },
];
const METHOD = /\b(?:req|request)\.method\s*={2,3}\s*['"`](GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)['"`]/;
const PATH = /\b(?:(?:url|u|parsed)\.pathname|(?:req|request)\.url)\s*(?:={2,3}|\.startsWith\s*\()\s*['"`]([^'"`]+)['"`]/;
const PYTHON_ROUTE = /\b(?:parsed\.path|self\.path)\s*(?:==|\.startswith\s*\()\s*['"]([^'"]+)['"]/;
const PYTHON_METHOD = /^\s*def do_(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s*\(/;
const PYTHON_OTHER_DEF = /^\s*def\s+[A-Za-z_][\w]*\s*\(/;
const LITERAL_HTTP_PATH = /^\/[A-Za-z0-9_.~:/{}*\-]+$/;

/** Static, source-only route extraction. Never use findings as live health or execution proof. */
function extractEndpoints(content, filePath) {
  const endpoints = [];
  const add = (type, method, route, line, matchType = 'exact') => {
    if (!LITERAL_HTTP_PATH.test(route)) return;
    endpoints.push({ type, method, path: route, line, matchType, evidenceState: 'SOURCE_ONLY_NOT_PROBED' });
  };
  for (const { type, pattern } of ENDPOINT_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(content)) !== null) {
      add(type, match[1].toUpperCase(), match[2], content.slice(0, match.index).split('\n').length);
    }
  }
  const python = /\.py$/i.test(filePath);
  let pythonMethod = null;
  content.split('\n').forEach((line, index) => {
    if (python) {
      const declaredMethod = PYTHON_METHOD.exec(line);
      if (declaredMethod) pythonMethod = declaredMethod[1];
      else if (PYTHON_OTHER_DEF.test(line)) pythonMethod = null;
      if (!pythonMethod || /^\s*#/.test(line)) return;
      const match = PYTHON_ROUTE.exec(line);
      if (!match) return;
      const prefix = line.includes('.startswith(');
      const route = prefix ? match[1].replace(/\/$/, '') + '/*' : match[1];
      add('python-http', pythonMethod, route, index + 1, prefix ? 'prefix' : 'exact');
      return;
    }
    if (/^\s*(?:\/\/|\*)/.test(line)) return;
    const method = METHOD.exec(line);
    const route = PATH.exec(line);
    // Never infer methods from a nearby condition or a route alias; both must
    // be literal conditions within the same statement.
    if (method && route) {
      const prefix = line.slice(route.index).includes('.startsWith(');
      add('node-http', method[1], prefix ? route[1].replace(/\/$/, '') + '/*' : route[1], index + 1, prefix ? 'prefix' : 'exact');
    }
  });
  return endpoints.sort((a, b) => a.line - b.line || a.method.localeCompare(b.method) || a.path.localeCompare(b.path));
}

/**
 * EndpointAgent detects existing HTTP endpoints and health checks in source files.
 */
export class EndpointAgent {
  constructor(options = {}) {
    this.rootDir = options.rootDir || process.cwd();
    this.knownEndpoints = new Map();
  }

  /**
   * Scan a file for endpoint declarations. The optional serviceId is assigned
   * by a trusted caller, never derived from the source contents or a URL.
   * @param {string} filePath
   * @param {{serviceId?:string}} options
   * @returns {Promise<EndpointScanResult>}
   */
  async scanFile(filePath, { serviceId } = {}) {
    const fullPath = filePath.startsWith('/') ? filePath : join(this.rootDir, filePath);
    let content = '';
    try {
      content = await readFile(fullPath, 'utf8');
    } catch {
      return { file: filePath, endpoints: [], status: 'error' };
    }
    const endpoints = extractEndpoints(content, filePath);
    if (serviceId !== undefined) {
      if (typeof serviceId !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(serviceId)) {
        return { file: filePath, endpoints: [], status: 'error' };
      }
      for (const ep of endpoints) ep.serviceId = serviceId;
    }
    return { file: filePath, endpoints, status: 'scanned' };
  }

  /**
   * Duplicate keys are service-scoped when serviceId is supplied. Two separate
   * services may legitimately use GET /health; a same-service conflict is reported.
   * @param {EndpointScanResult[]} scanResults
   */
  detectDuplicates(scanResults) {
    const seen = new Map();
    const duplicates = [];
    for (const result of scanResults) {
      for (const ep of result.endpoints) {
        const key = (ep.serviceId ? ep.serviceId + ':' : '') + ep.method + ':' + ep.path;
        if (seen.has(key)) {
          duplicates.push({ key, files: [seen.get(key).file, result.file], endpoint: ep });
        } else {
          seen.set(key, { ...ep, file: result.file });
        }
      }
    }
    return { duplicates, unique: Array.from(seen.values()) };
  }
}
