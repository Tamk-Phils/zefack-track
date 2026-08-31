const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..');

const replacements = [
    { regex: /SwiftLink Shipping/g, replacement: 'Transglologistics' },
    { regex: /SWIFTLINK SHIPPING/g, replacement: 'TRANSGLOLOGISTICS' },
    { regex: /SwiftLink/g, replacement: 'Transglologistics' },
    { regex: /SWIFTLINK/g, replacement: 'TRANSGLOLOGISTICS' },
    { regex: /swiftlinkshipping\.com/g, replacement: 'transglologistics.com' },
    { regex: /swiftlink/g, replacement: 'transglologistics' },
    { regex: /Vortex Shipping/g, replacement: 'Transglologistics' },
    { regex: /VORTEX SHIPPING/g, replacement: 'TRANSGLOLOGISTICS' },
    { regex: /Vortex Global/g, replacement: 'Transglologistics' },
    { regex: /VORTEX GLOBAL/g, replacement: 'TRANSGLOLOGISTICS' },
    { regex: /Vortex Air Cargo/g, replacement: 'Transglologistics Air Cargo' },
    { regex: /Vortex Freight Trucking/g, replacement: 'Transglologistics Freight Trucking' },
    { regex: /Vortex/g, replacement: 'Transglologistics' },
    { regex: /VORTEX/g, replacement: 'TRANSGLOLOGISTICS' },
    { regex: /vortex/g, replacement: 'transglologistics' }
];

// Files and directories to ignore
const ignoreList = [
    'node_modules',
    '.git',
    '.next',
    'package-lock.json', // Best not to mess with package-lock manually
    'rename.js',
    '.env.local' // Don't change database names if it happens to match, though here we might want to change it. Actually, .env.local doesn't contain these except in FROM_NAME. Let's include it.
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (ignoreList.includes(file)) continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            // Only process text files (ts, tsx, js, json, md, html, css, etc)
            if (/\.(ts|tsx|js|jsx|json|md|html|css|sql|txt)$/.test(file) || file === '.env.local') {
                try {
                    let content = fs.readFileSync(fullPath, 'utf8');
                    let modified = false;

                    for (const { regex, replacement } of replacements) {
                        if (regex.test(content)) {
                            content = content.replace(regex, replacement);
                            modified = true;
                        }
                    }

                    if (modified) {
                        fs.writeFileSync(fullPath, content, 'utf8');
                        console.log(`Updated: ${fullPath}`);
                    }
                } catch (err) {
                    console.error(`Error processing ${fullPath}:`, err.message);
                }
            }
        }
    }
}

processDirectory(directoryPath);
console.log("Renaming complete.");
