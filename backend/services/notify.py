# backend/services/notify.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

def send_status_notification(email: str, tramite_id: str, status: str, priority: str) -> bool:
    """
    Envía notificación por email al ciudadano.
    Retorna True si se envió correctamente.
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        print("[WARN] Credenciales SMTP no configuradas. Notificación simulada.")
        return False

    try:
        # Crear mensaje
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = f"Trámite {tramite_id} - Estado: {status}"

        # Cuerpo del email
        body = f"""
        <html>
        <body>
            <h2>Municipalidad Provincial de Yau</h2>
            <p>Estimado ciudadano,</p>
            <p>Su trámite ha sido recibido exitosamente:</p>
            <ul>
                <li><strong>ID de Trámite:</strong> {tramite_id}</li>
                <li><strong>Estado:</strong> {status}</li>
                <li><strong>Prioridad:</strong> {priority}</li>
            </ul>
            <p>Puede consultar el estado en cualquier momento ingresando su ID en nuestro portal.</p>
            <p>Gracias por utilizar nuestros servicios digitales.</p>
        </body>
        </html>
        """
        msg.attach(MIMEText(body, 'html'))

        # Enviar
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"[INFO] Notificación enviada a {email}")
        return True

    except Exception as e:
        print(f"[ERROR] No se pudo enviar notificación: {e}")
        return False
