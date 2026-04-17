import PyPDF2
with open("HPRC Equestrian Challenge 2026 Member Notice-1.pdf", "rb") as file:
    reader = PyPDF2.PdfReader(file)
    for i in range(len(reader.pages)):
        print(f"--- Page {i+1} ---")
        print(reader.pages[i].extract_text().encode("ascii", "ignore").decode())
