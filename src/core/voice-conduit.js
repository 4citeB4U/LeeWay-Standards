/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.SDK.VOICE_CONDUIT.MAIN

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#0DFF94
PASTEL=#C7FFD8

ICON_ASCII:
family=lucide
glyph=file

5WH:
WHAT = voice-conduit module
WHY = Part of CORE region
WHO = LEEWAY Align Agent
WHERE = src\core\voice-conduit.js
WHEN = 2026
HOW = Auto-aligned by LEEWAY align-agent

AGENTS:
ASSESS
ALIGN
AUDIT

LICENSE:
MIT
*/

import { execSync } from 'child_process';

/**
 * VoiceConduit: The Sovereign Voice of Lee
 * Synchronous TTS to ensure Lee is HEARD before the system proceeds.
 */
export class VoiceConduit {
  static speak(text) {
    if (!text) return;

    // Clean text for shell safety
    const cleanText = text.replace(/'/g, "").replace(/"/g, "").replace(/\n/g, ' ');

    let command = '';
    
    if (process.platform === 'win32') {
      // Windows PowerShell TTS (Blocking via synchronous exec)
      command = `powershell -Command "Add-Type -AssemblyName System.speech; $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; $synth.Speak('${cleanText}')"`;
    } else if (process.platform === 'darwin') {
      command = `say "${cleanText}"`;
    } else {
      command = `espeak "${cleanText}"`;
    }

    try {
      // execSync to block the process until Lee is done talking
      execSync(command, { stdio: 'ignore' });
    } catch (err) {
      // Fallback silently if TTS fails
    }
  }
}
