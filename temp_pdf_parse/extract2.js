const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("c:/Users/VEER/Desktop/HosteX/extracted_pdf.txt", pdfParser.getRawTextContent());
    console.log("Success! Extracted to extracted_pdf.txt");
});
pdfParser.loadPDF("c:/Users/VEER/Desktop/HosteX/SCH_Documentation.pdf");
