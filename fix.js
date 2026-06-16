const fs = require('fs');
const files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/â†’/g, '&rarr;');
  content = content.replace(/Â©/g, '&copy;');
  content = content.replace(/â€”/g, '&mdash;');
  content = content.replace(/â€“/g, '&ndash;');
  fs.writeFileSync(f, content, 'utf8');
});
