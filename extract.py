import sys

def fallback_extract(filepath):
    print("Trying pdfplumber...")
    try:
        import pdfplumber
        text = ""
        with pdfplumber.open(filepath) as pdf:
            for page in pdf.pages:
                text += page.extract_text()
        return text
    except ImportError:
        pass

    print("Trying PyPDF2...")
    try:
        import PyPDF2
        text = ""
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text()
        return text
    except ImportError:
        pass
        
    print("Trying fitz (PyMuPDF)...")
    try:
        import fitz
        text = ""
        doc = fitz.open(filepath)
        for page in doc:
            text += page.get_text()
        return text
    except ImportError:
        pass
    
    return "No suitable library found"

if __name__ == "__main__":
    filepath = sys.argv[1]
    text = fallback_extract(filepath)
    if text != "No suitable library found":
        with open("c:/Users/VEER/Desktop/HosteX/extracted_pdf.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Success! Extracted to extracted_pdf.txt")
    else:
        print(text)
