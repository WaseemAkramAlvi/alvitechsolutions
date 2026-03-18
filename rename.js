const fs = require('fs');
const path = require('path');
const dir = 'src/pages';
fs.readdirSync(dir).forEach(file => {
    const trimmed = file.trim();
    if (file !== trimmed) {
        fs.renameSync(path.join(dir, file), path.join(dir, trimmed));
        console.log('Renamed', `"${file}"`, 'to', `"${trimmed}"`);
    }
});
