-- Script SQL para crear la base de datos en XAMPP/MySQL
-- Ejecutar en phpMyAdmin o MySQL Workbench

CREATE DATABASE IF NOT EXISTS municipalidad_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE municipalidad_db;

-- Tabla de trámites
CREATE TABLE IF NOT EXISTS tramites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tramite_id VARCHAR(50) UNIQUE NOT NULL,
    email_ciudadano VARCHAR(255) NOT NULL,
    tipo_solicitud VARCHAR(100) NOT NULL,
    archivo_path VARCHAR(500),
    texto_extraido TEXT,
    prioridad VARCHAR(20),
    tipo_documento VARCHAR(100),
    confianza_ml FLOAT,
    status VARCHAR(50) DEFAULT 'recibido',
    notificacion_enviada TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tramite_id (tramite_id),
    INDEX idx_email (email_ciudadano),
    INDEX idx_status (status),
    INDEX idx_prioridad (prioridad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo
INSERT INTO tramites (tramite_id, email_ciudadano, tipo_solicitud, prioridad, tipo_documento, confianza_ml, status) VALUES
('DEMO001', 'juan@example.com', 'licencia', 'alta', 'licencia_construccion', 0.95, 'en_proceso'),
('DEMO002', 'maria@example.com', 'cv', 'media', 'curriculum', 0.88, 'recibido'),
('DEMO003', 'pedro@example.com', 'denuncia', 'alta', 'denuncia_ambiental', 0.92, 'completado');
