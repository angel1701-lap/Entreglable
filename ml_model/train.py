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

# Datos de ejemplo para entrenamiento
data = {
    'texto': [
        'solicitud de licencia de construcción urgente',
        'curriculum vitae ingeniero civil',
        'denuncia por ruidos molestos',
        'solicitud de certificado de residencia',
        'curriculum vitae contador',
        'reclamo por falta de agua potable',
        'solicitud de permiso comercial',
        'curriculum vitae abogado',
        'denuncia por contaminación ambiental',
        'solicitud de copia de partida de nacimiento',
        'curriculum vitae médico',
        'reclamo urgente por fuga de gas',
        'solicitud de licencia de funcionamiento',
        'curriculum vitae profesor',
        'denuncia por maltrato animal',
        'solicitud urgente de permiso especial',
        'curriculum vitae arquitecto experiencia',
        'reclamo por servicio de limpieza',
        'certificado de antecedentes penales',
        'denuncia grave por acoso',
    ],
    'prioridad': [
        'alta', 'media', 'alta', 'baja', 'media',
        'alta', 'media', 'media', 'alta', 'baja',
        'media', 'alta', 'media', 'media', 'alta',
        'alta', 'media', 'media', 'baja', 'alta'
    ],
    'tipo': [
        'licencia', 'cv', 'denuncia', 'certificado', 'cv',
        'reclamo', 'licencia', 'cv', 'denuncia', 'certificado',
        'cv', 'reclamo', 'licencia', 'cv', 'denuncia',
        'licencia', 'cv', 'reclamo', 'certificado', 'denuncia'
    ]
}

df = pd.DataFrame(data)
print(f"[INFO] Dataset: {len(df)} ejemplos")

# Vectorización de texto con TF-IDF
vectorizer = TfidfVectorizer(max_features=100, ngram_range=(1, 2))
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

# Modelo para PRIORIDAD
print("\n[INFO] Entrenando modelo de PRIORIDAD...")
model_prioridad = keras.Sequential([
    layers.Input(shape=(X.shape[1],)),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(len(encoder_prioridad.classes_), activation='softmax')
], name='modelo_prioridad')

model_prioridad.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history_prioridad = model_prioridad.fit(
    X, y_prioridad_cat,
    epochs=100,
    batch_size=4,
    verbose=0,
    validation_split=0.2
)

print(f"[INFO] Accuracy final (prioridad): {history_prioridad.history['accuracy'][-1]:.3f}")

# Modelo para TIPO
print("\n[INFO] Entrenando modelo de TIPO...")
model_tipo = keras.Sequential([
    layers.Input(shape=(X.shape[1],)),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(len(encoder_tipo.classes_), activation='softmax')
], name='modelo_tipo')

model_tipo.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history_tipo = model_tipo.fit(
    X, y_tipo_cat,
    epochs=100,
    batch_size=4,
    verbose=0,
    validation_split=0.2
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
