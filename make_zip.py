import os
import zipfile
import json

EXCLUDE_DIRS = {
    'venv', 'node_modules', '.next', '.git', '.github', 
    '__pycache__', '.agents', '.gemini', 'tmp', 'temp'
}
EXCLUDE_FILES = {
    '.env', '.env.local', 'update.zip', 'make_zip.py',
    'update.log', 'update.lock', '.DS_Store'
}

def make_zip():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    zip_path = os.path.join(root_dir, 'update.zip')
    
    # Read version info for display
    version_info = {}
    version_path = os.path.join(root_dir, 'version.json')
    if os.path.exists(version_path):
        with open(version_path, 'r', encoding='utf-8') as f:
            version_info = json.load(f)
    
    print(f"Creating zip file for version: {version_info.get('version', 'unknown')}...")
    
    count = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
            
            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.pyc') or file.endswith('.db'):
                    continue
                
                file_path = os.path.join(root, file)
                arc_name = os.path.relpath(file_path, root_dir)
                zipf.write(file_path, arc_name)
                count += 1
                
    print(f"Successfully created {zip_path} containing {count} files.")

if __name__ == '__main__':
    make_zip()
