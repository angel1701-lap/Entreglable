# ml_model/train.py
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import joblib
import json

print(f"[INFO] TensorFlow version: {tf.__version__}")

# Datos de ejemplo para entrenamiento - DATASET AMPLIADO Y BALANCEADO
data = {
    'texto': [
        # === PRIORIDAD ALTA (urgente, emergencia, grave) ===
        'solicitud urgente de licencia de construcción para hospital',
        'denuncia grave por acoso laboral en oficina municipal',
        'reclamo urgente por fuga de gas en edificio residencial',
        'emergencia por falta de agua potable en sector norte',
        'denuncia urgente por maltrato infantil en escuela',
        'solicitud urgente de permiso especial para evento masivo',
        'reclamo grave por contaminación de río con desechos tóxicos',
        'denuncia urgente por incendio forestal cerca de viviendas',
        'solicitud urgente de ambulancia para traslado de paciente',
        'reclamo urgente por corte de luz en hospital',
        'denuncia grave por violencia doméstica en barrio',
        'emergencia por derrumbe de puente peatonal',
        'solicitud urgente de permiso para demolición de edificio peligroso',
        'reclamo urgente por falta de recolección de basura hace 2 semanas',
        'denuncia urgente por robo con violencia en comercio',
        'emergencia sanitaria por brote de enfermedad en colegio',
        'solicitud urgente de cierre de calle por accidente grave',
        'reclamo urgente por inundación en viviendas por lluvia',
        'denuncia grave por tráfico de drogas en parque público',
        'emergencia por colapso de alcantarillado en avenida principal',
        
        # === PRIORIDAD MEDIA (normal, sin urgencia extrema) ===
        'curriculum vitae de ingeniero civil con 5 años de experiencia',
        'solicitud de licencia de funcionamiento para restaurante',
        'curriculum vitae de contador público titulado',
        'solicitud de permiso comercial para tienda de ropa',
        'curriculum vitae de abogado especialista en derecho civil',
        'reclamo por demora en trámite de licencia de conducir',
        'curriculum vitae de médico general con especialidad',
        'solicitud de permiso para construcción de casa habitación',
        'curriculum vitae de profesor de educación básica',
        'reclamo por mal servicio de limpieza en parque',
        'curriculum vitae de arquitecto con experiencia en proyectos',
        'solicitud de licencia para venta de alcohol en local',
        'curriculum vitae de ingeniero en sistemas computacionales',
        'reclamo por baches en calle del barrio',
        'curriculum vitae de psicólogo clínico titulado',
        'solicitud de permiso para instalación de letrero comercial',
        'curriculum vitae de enfermera con experiencia hospitalaria',
        'reclamo por ruidos molestos de vecino en horario nocturno',
        'curriculum vitae de administrador de empresas',
        'solicitud de licencia para apertura de farmacia',
        'curriculum vitae de diseñador gráfico freelance',
        'reclamo por falta de iluminación en calle',
        'curriculum vitae de chef con experiencia internacional',
        'solicitud de permiso para evento cultural en plaza',
        'curriculum vitae de electricista certificado',
        
        # === PRIORIDAD BAJA (trámites simples, consultas) ===
        'solicitud de certificado de residencia para trámite bancario',
        'solicitud de copia de partida de nacimiento',
        'consulta sobre requisitos para licencia de conducir',
        'solicitud de certificado de antecedentes penales',
        'consulta sobre horarios de atención al público',
        'solicitud de copia de plano regulador de la comuna',
        'consulta sobre pago de patente comercial',
        'solicitud de certificado de avalúo fiscal de propiedad',
        'consulta sobre trámites de matrimonio civil',
        'solicitud de copia de certificado de defunción',
        'consulta sobre requisitos para permiso de circulación',
        'solicitud de información sobre programas sociales',
        'consulta sobre fechas de pago de contribuciones',
        'solicitud de certificado de número de rol único tributario',
        'consulta sobre ubicación de oficinas municipales',
        'solicitud de formulario para postular a subsidio',
        'consulta sobre requisitos para inscripción en registro civil',
        'solicitud de certificado de no tener deudas municipales',
        'consulta sobre proceso de reclamo por multas de tránsito',
        'solicitud de información sobre cursos gratuitos municipales',
        'consulta sobre requisitos para adopción de mascotas',
        'solicitud de certificado de vigencia de título profesional',
        'consulta sobre trámites para cambio de domicilio',
        'solicitud de información sobre ferias libres de la comuna',
        'consulta sobre calendario de actividades recreativas',
        
        # === MÁS EJEMPLOS PARA BALANCEO ===
        # Alta prioridad adicional
        'emergencia por escape de gas en colegio con niños',
        'denuncia urgente por abuso sexual en institución',
        'reclamo urgente por colapso de muro en vía pública',
        'emergencia por contaminación de agua potable con químicos',
        'denuncia grave por corrupción de funcionario público',
        
        # Media prioridad adicional
        'curriculum vitae de veterinario con clínica propia',
        'solicitud de permiso para ampliación de local comercial',
        'reclamo por demora en respuesta de solicitud anterior',
        'curriculum vitae de periodista con experiencia en medios',
        'solicitud de licencia para taller mecánico',
        
        # Baja prioridad adicional
        'consulta sobre requisitos para obtener pasaporte',
        'solicitud de certificado de estudios de enseñanza media',
        'consulta sobre trámites para registro de marca comercial',
        'solicitud de información sobre bibliotecas públicas',
        'consulta sobre proceso de postulación a empleos municipales',
    ],
    'prioridad': [
        # Alta (20 ejemplos)
        'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta',
        'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta', 'alta',
        # Media (25 ejemplos)
        'media', 'media', 'media', 'media', 'media', 'media', 'media', 'media', 'media', 'media',
        'media', 'media', 'media', 'media', 'media', 'media', 'media', 'media', 'media', 'media',
        'media', 'media', 'media', 'media', 'media',
        # Baja (25 ejemplos)
        'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja',
        'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja', 'baja',
        'baja', 'baja', 'baja', 'baja', 'baja',
        # Adicionales para balanceo (10 ejemplos)
        'alta', 'alta', 'alta', 'alta', 'alta',
        'media', 'media', 'media', 'media', 'media',
        'baja', 'baja', 'baja', 'baja', 'baja',
    ],
    'tipo': [
        # Alta prioridad - tipos variados
        'licencia', 'denuncia', 'reclamo', 'reclamo', 'denuncia', 'licencia', 'reclamo', 'denuncia', 'reclamo', 'reclamo',
        'denuncia', 'reclamo', 'licencia', 'reclamo', 'denuncia', 'reclamo', 'licencia', 'reclamo', 'denuncia', 'reclamo',
        # Media prioridad - principalmente CV y licencias
        'cv', 'licencia', 'cv', 'licencia', 'cv', 'reclamo', 'cv', 'licencia', 'cv', 'reclamo',
        'cv', 'licencia', 'cv', 'reclamo', 'cv', 'licencia', 'cv', 'reclamo', 'cv', 'licencia',
        'cv', 'reclamo', 'cv', 'licencia', 'cv',
        # Baja prioridad - principalmente certificados y consultas
        'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado',
        'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado', 'certificado',
        'certificado', 'certificado', 'certificado', 'certificado', 'certificado',
        # Adicionales
        'reclamo', 'denuncia', 'reclamo', 'reclamo', 'denuncia',
        'cv', 'licencia', 'reclamo', 'cv', 'licencia',
        'certificado', 'certificado', 'certificado', 'certificado', 'certificado',
    ]
}

df = pd.DataFrame(data)
print(f"[INFO] Dataset: {len(df)} ejemplos")

# Mostrar distribución de clases
print("\n[INFO] Distribución de clases:")
print("  Prioridad:")
for prioridad, count in df['prioridad'].value_counts().items():
    print(f"    - {prioridad}: {count} ejemplos ({count/len(df)*100:.1f}%)")
print("  Tipo:")
for tipo, count in df['tipo'].value_counts().items():
    print(f"    - {tipo}: {count} ejemplos ({count/len(df)*100:.1f}%)")

# Vectorización de texto con TF-IDF (más features para mejor precisión)
vectorizer = TfidfVectorizer(
    max_features=200,  # Aumentado de 100 a 200
    ngram_range=(1, 3),  # Incluir trigramas para mejor contexto
    min_df=1,  # Mínima frecuencia de documento
    max_df=0.9  # Máxima frecuencia de documento
)
X = vectorizer.fit_transform(df['texto']).toarray()
print(f"[INFO] Features TF-IDF: {X.shape[1]}")

# Encoders para las etiquetas
encoder_prioridad = LabelEncoder()
encoder_tipo = LabelEncoder()

y_prioridad = encoder_prioridad.fit_transform(df['prioridad'])
y_tipo = encoder_tipo.fit_transform(df['tipo'])

# Convertir a categorical (one-hot encoding)
y_prioridad_cat = keras.utils.to_categorical(y_prioridad)
y_tipo_cat = keras.utils.to_categorical(y_tipo)

print(f"[INFO] Clases prioridad: {encoder_prioridad.classes_}")
print(f"[INFO] Clases tipo: {encoder_tipo.classes_}")

# Modelo para PRIORIDAD (mejorado con más capas y neuronas)
print("\n[INFO] Entrenando modelo de PRIORIDAD...")
model_prioridad = keras.Sequential([
    layers.Input(shape=(X.shape[1],)),
    layers.Dense(128, activation='relu'),  # Aumentado de 64 a 128
    layers.BatchNormalization(),  # Normalización para mejor entrenamiento
    layers.Dropout(0.4),
    layers.Dense(64, activation='relu'),  # Capa adicional
    layers.BatchNormalization(),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(len(encoder_prioridad.classes_), activation='softmax')
], name='modelo_prioridad')

model_prioridad.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history_prioridad = model_prioridad.fit(
    X, y_prioridad_cat,
    epochs=200,  # Aumentado de 100 a 200 épocas
    batch_size=8,  # Aumentado de 4 a 8
    verbose=0,
    validation_split=0.15  # Reducido para tener más datos de entrenamiento
)

print(f"[INFO] Accuracy final (prioridad): {history_prioridad.history['accuracy'][-1]:.3f}")

# Modelo para TIPO (mejorado con más capas y neuronas)
print("\n[INFO] Entrenando modelo de TIPO...")
model_tipo = keras.Sequential([
    layers.Input(shape=(X.shape[1],)),
    layers.Dense(128, activation='relu'),  # Aumentado de 64 a 128
    layers.BatchNormalization(),
    layers.Dropout(0.4),
    layers.Dense(64, activation='relu'),  # Capa adicional
    layers.BatchNormalization(),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(len(encoder_tipo.classes_), activation='softmax')
], name='modelo_tipo')

model_tipo.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history_tipo = model_tipo.fit(
    X, y_tipo_cat,
    epochs=200,  # Aumentado de 100 a 200 épocas
    batch_size=8,  # Aumentado de 4 a 8
    verbose=0,
    validation_split=0.15
)

print(f"[INFO] Accuracy final (tipo): {history_tipo.history['accuracy'][-1]:.3f}")

# Guardar modelos TensorFlow
model_prioridad.save('model_prioridad.h5')
model_tipo.save('model_tipo.h5')
print("\n[INFO] Modelos TensorFlow guardados:")
print("  - model_prioridad.h5")
print("  - model_tipo.h5")

# Guardar vectorizador y encoders con joblib
artifacts = {
    'vectorizer': vectorizer,
    'encoder_prioridad': encoder_prioridad,
    'encoder_tipo': encoder_tipo
}
joblib.dump(artifacts, 'model_artifacts.pkl')
print("  - model_artifacts.pkl (vectorizer + encoders)")

# Guardar metadata en JSON
metadata = {
    'tensorflow_version': tf.__version__,
    'input_shape': X.shape[1],
    'clases_prioridad': encoder_prioridad.classes_.tolist(),
    'clases_tipo': encoder_tipo.classes_.tolist(),
    'num_ejemplos': len(df),
    'accuracy_prioridad': float(history_prioridad.history['accuracy'][-1]),
    'accuracy_tipo': float(history_tipo.history['accuracy'][-1])
}

with open('model_metadata.json', 'w', encoding='utf-8') as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)
print("  - model_metadata.json")

print("\n[SUCCESS] ✓ Entrenamiento completado exitosamente!")
