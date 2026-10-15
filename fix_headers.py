# LEEWAY HEADER — DO NOT REMOVE
# DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
# REGION: CORE.SOURCE.PY
# TAG: CORE.SOURCE.FIX_HEADERS_PY.MAIN
# 5WH:
# WHAT = fix_headers.py existing LeeWay source
# WHY = Preserve the source and qualify documented governance identity
# WHO = LeeWay Standards repository (stewardship, original author unverified)
# WHERE = fix_headers.py
# WHEN = 2026-10-15 (conformance review)
# HOW = Existing source body remains unchanged
# LICENSE: MIT (package metadata; original source license scope requires confirmation)
import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    prefix = "/*\nLEEWAY HEADER"
    if content.startswith(prefix) or content.startswith("/*\r\nLEEWAY HEADER"):
        end_idx = content.find("*/\n")
        if end_idx != -1:
            # Add 3 to skip "*/\n"
            new_content = content[end_idx+3:]
            # Optionally also handle "*/\r\n"
        else:
            end_idx = content.find("*/\r\n")
            if end_idx != -1:
                new_content = content[end_idx+4:]
            else:
                return False

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    root_dir = r"d:\LeeWay-Standards"
    fixed_count = 0
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # skip .venv, .git, node_modules
        dirnames[:] = [d for d in dirnames if d not in ('.venv', '.git', 'node_modules')]
        for filename in filenames:
            if filename.endswith(".py"):
                filepath = os.path.join(dirpath, filename)
                if fix_file(filepath):
                    fixed_count += 1
                    print(f"Fixed: {filepath}")
    
    print(f"Total fixed: {fixed_count}")

if __name__ == "__main__":
    main()
