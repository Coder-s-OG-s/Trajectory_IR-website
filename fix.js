const fs = require('fs');
const file = 'h:/Trajectory_IR-website/src/components/dashboard-showcase.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file has literal "\`" and "\$" that need to become "`" and "$"
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');

fs.writeFileSync(file, content);
console.log('Fixed syntax errors.');
