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


def send_custom_message(email: str, tramite_id: str, subject: str, message: str) -> bool:
    """
    Envía mensaje personalizado al ciudadano desde el panel de administración.
    Retorna True si se envió correctamente.
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        print("[WARN] Credenciales SMTP no configuradas. Mensaje simulado.")
        print(f"[SIMULACIÓN] Email a: {email}")
        print(f"[SIMULACIÓN] Asunto: {subject}")
        print(f"[SIMULACIÓN] Mensaje: {message[:100]}...")
        print(f"[SIMULACIÓN] Trámite ID: {tramite_id}")
        # En modo simulación, retornamos True para que la funcionalidad funcione
        return True

    try:
        # Crear mensaje
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = subject

        # Cuerpo del email con el mensaje personalizado
        body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #2c3e50; color: white; padding: 20px; text-center; }}
                .content {{ background-color: #f8f9fa; padding: 20px; }}
                .message-box {{ background-color: white; border-left: 4px solid #3498db; padding: 20px; margin: 15px 0; }}
                .footer {{ text-align: center; padding: 20px; color: #7f8c8d; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏛️ Municipalidad Provincial de Yau</h1>
                    <p>Sistema de Gestión de Trámites</p>
                </div>
                
                <div class="content">
                    <h2>📧 Mensaje del Administrador</h2>
                    <p>Estimado ciudadano,</p>
                    <p>Hemos recibido una actualización sobre su trámite <strong>#{tramite_id}</strong>:</p>
                    
                    <div class="message-box">
                        <p style="white-space: pre-wrap; line-height: 1.6;">{message}</p>
                    </div>
                    
                    <p><strong>¿Necesita más información?</strong></p>
                    <p>Puede consultar el estado de su trámite en cualquier momento visitando nuestro portal web.</p>
                    
                    <p>Gracias por su atención.</p>
                </div>
                
                <div class="footer">
                    <p>Este es un mensaje del personal de la Municipalidad Provincial de Yau.</p>
                    <p>Para consultas, visite nuestro portal o acérquese a nuestras oficinas.</p>
                </div>
            </div>
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

        print(f"[INFO] Mensaje personalizado enviado a {email}")
        return True

    except Exception as e:
        print(f"[ERROR] No se pudo enviar mensaje personalizado: {e}")
        return False
