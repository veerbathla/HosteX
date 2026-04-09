const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync(process.argv[2]);

let parser = typeof pdf === 'function' ? pdf : pdf.default;

parser(dataBuffer).then(function(data) {
    fs.writeFileSync('c:/Users/VEER/Desktop/HosteX/extracted_pdf.txt', data.text, 'utf-8');
    console.log('Success! Extracted to extracted_pdf.txt');
}).catch(err => {
    console.error('Error:', err);
});
