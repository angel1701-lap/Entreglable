#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script para probar el envío de un trámite
"""
import requests
import os

# Crear un PDF de prueba simple
test_file_path = "test_document.pdf"
try:
    from PyPDF2 import PdfWriter, PdfReader
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    from io import BytesIO
    
    # Crear PDF con reportlab
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.drawString(100, 750, "SOLICITUD DE LICENCIA DE CONSTRUCCIÓN")
    c.drawString(100, 700, "Este es un documento de prueba urgente.")
    c.save()
    
    # Guardar en archivo
    with open(test_file_path, 'wb') as f:
        f.write(buffer.getvalue())
    
    print("✓ PDF de prueba creado")
except ImportError:
    # Si no hay reportlab, crear un PDF simple manualmente
    # PDF mínimo válido
    pdf_content = b"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Solicitud urgente) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000317 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
410
%%EOF"""
    with open(test_file_path, 'wb') as f:
        f.write(pdf_content)
    print("✓ PDF simple creado")

print("="*60)
print("PRUEBA DE ENVÍO DE TRÁMITE")
print("="*60)

# Preparar datos
url = "http://localhost:8000/api/v1/tramites"
files = {
    'file': ('test_document.pdf', open(test_file_path, 'rb'), 'application/pdf')
}
data = {
    'email': 'test@example.com',
    'tipo_solicitud': 'licencia'
}

print(f"\nEnviando trámite a: {url}")
print(f"Email: {data['email']}")
print(f"Tipo: {data['tipo_solicitud']}")
print()

try:
    response = requests.post(url, files=files, data=data, timeout=30)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        print("\n✓ TRÁMITE ENVIADO EXITOSAMENTE")
        print(f"  ID: {result.get('tramite_id')}")
        print(f"  Prioridad: {result.get('prioridad')}")
        print(f"  Estado: {result.get('status')}")
    else:
        print(f"\n✗ ERROR: {response.status_code}")
        print(f"  {response.text}")
        
except Exception as e:
    print(f"\n✗ ERROR: {e}")
    import traceback
    traceback.print_exc()

finally:
    # Limpiar archivo de prueba
    if os.path.exists(test_file_path):
        os.remove(test_file_path)
    print("\n" + "="*60)
