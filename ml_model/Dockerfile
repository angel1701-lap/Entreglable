# ML Model Dockerfile
FROM python:3.13-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código y modelos
COPY . .

# Exponer puerto
EXPOSE 8001

# Comando para ejecutar la aplicación
CMD ["python", "api_ml.py"]
