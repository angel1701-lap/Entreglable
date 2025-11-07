# backend/services/document_processor.py
import os
from pathlib import Path
import PyPDF2
import pytesseract
from PIL import Image

SUPPORTED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}

def extract_text_from_file(file_path: str) -> str:
    """
    Extrae texto de un archivo PDF o imagen.
    """
    ext = Path(file_path).suffix.lower()

    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext in {".jpg", ".jpeg", ".png"}:
        return extract_text_from_image(file_path)
    else:
        raise ValueError(f"Formato no soportado: {ext}")

def extract_text_from_pdf(pdf_path: str) -> str:
    text = ""
    try:
        with open(pdf_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
    except Exception as e:
        print(f"Error leyendo PDF: {e}")
    return text

def extract_text_from_image(img_path: str) -> str:
    try:
        img = Image.open(img_path)
        return pytesseract.image_to_string(img, lang="spa")
    except Exception as e:
        print(f"Error OCR en imagen: {e}")
        return ""