const fs = require('fs');

let c = fs.readFileSync('services.html', 'utf8');

c = c.replace(/<span class="tag">Zapier \/ Make<\/span>/g, '');

c = c.replace(/directly [^a-zA-Z0-9<]* no developer/g, 'directly &mdash; no developer');
c = c.replace(/live within 5[^a-zA-Z0-9<]*7 business days/g, 'live within 5-7 business days');
c = c.replace(/staff [^a-zA-Z0-9<]* your data/g, 'staff &mdash; your data');
c = c.replace(/start [^a-zA-Z0-9<]* no rewrites/g, 'start &mdash; no rewrites');
c = c.replace(/HTTPS [^a-zA-Z0-9<]* enterprise security/g, 'HTTPS &mdash; enterprise security');
c = c.replace(/exactly [^a-zA-Z0-9<]* custom stages/g, 'exactly &mdash; custom stages');
c = c.replace(/data [^a-zA-Z0-9<]* forever/g, 'data &mdash; forever');
c = c.replace(/relies on [^a-zA-Z0-9<]* payments/g, 'relies on &mdash; payments');
c = c.replace(/PayPal [^a-zA-Z0-9<]* fully integrated/g, 'PayPal &mdash; fully integrated');
c = c.replace(/email [^a-zA-Z0-9<]* keep customers/g, 'email &mdash; keep customers');
c = c.replace(/systems [^a-zA-Z0-9<]* we turn your/g, 'systems &mdash; we turn your');

// Replace the comment section headers if they are corrupt
c = c.replace(/<!-- [^a-zA-Z0-9<]* ([A-Z0-9\s:]+) [^a-zA-Z0-9<]* -->/g, '<!-- --  -- -->');

fs.writeFileSync('services.html', c, 'utf8');
