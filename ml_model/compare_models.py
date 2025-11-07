# ml_model/compare_models.py
"""
Script para comparar el rendimiento entre Scikit-learn y TensorFlow
"""
import time
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import tensorflow as tf
from tensorflow import keras
import joblib

# Datos de prueba
test_texts = [
    "solicitud urgente de licencia de construcción",
    "curriculum vitae ingeniero con experiencia",
    "denuncia grave por contaminación ambiental",
    "solicitud de certificado de residencia",
    "reclamo por servicio de agua potable"
]

print("="*70)
print("  COMPARACIÓN: Scikit-learn vs TensorFlow")
print("="*70)

# ============================================================================
# SCIKIT-LEARN
# ============================================================================
print("\n[1] SCIKIT-LEARN (Random Forest)")
print("-" * 70)

try:
    # Entrenar modelo simple de Scikit-learn
    from sklearn.preprocessing import LabelEncoder
    
    train_texts = [
        'solicitud de licencia de construcción urgente',
        'curriculum vitae ingeniero civil',
        'denuncia por ruidos molestos',
        'solicitud de certificado de residencia',
        'reclamo por falta de agua potable',
    ]
    train_prioridad = ['alta', 'media', 'alta', 'baja', 'alta']
    
    vectorizer_sk = TfidfVectorizer(max_features=100, ngram_range=(1, 2))
    X_train = vectorizer_sk.fit_transform(train_texts)
    
    clf_sk = RandomForestClassifier(n_estimators=50, random_state=42)
    clf_sk.fit(X_train, train_prioridad)
    
    # Medir tiempo de predicción
    start = time.time()
    X_test = vectorizer_sk.transform(test_texts)
    predictions_sk = clf_sk.predict(X_test)
    probas_sk = clf_sk.predict_proba(X_test)
    time_sk = time.time() - start
    
    print(f"✓ Tiempo de predicción: {time_sk*1000:.2f} ms")
    print(f"✓ Predicciones: {predictions_sk}")
    print(f"✓ Confianza promedio: {np.mean([np.max(p) for p in probas_sk]):.3f}")
    
except Exception as e:
    print(f"✗ Error: {e}")
    time_sk = None

# ============================================================================
# TENSORFLOW
# ============================================================================
print("\n[2] TENSORFLOW (Neural Network)")
print("-" * 70)

try:
    # Verificar si existen los modelos
    import os
    if not os.path.exists('model_prioridad.h5'):
        print("⚠ Modelos no encontrados. Ejecuta 'python train.py' primero.")
    else:
        # Cargar modelos TensorFlow
        model_tf = keras.models.load_model('model_prioridad.h5')
        artifacts = joblib.load('model_artifacts.pkl')
        vectorizer_tf = artifacts['vectorizer']
        encoder_tf = artifacts['encoder_prioridad']
        
        # Medir tiempo de predicción
        start = time.time()
        X_test_tf = vectorizer_tf.transform(test_texts).toarray()
        probas_tf = model_tf.predict(X_test_tf, verbose=0)
        predictions_tf = encoder_tf.inverse_transform(np.argmax(probas_tf, axis=1))
        time_tf = time.time() - start
        
        print(f"✓ Tiempo de predicción: {time_tf*1000:.2f} ms")
        print(f"✓ Predicciones: {predictions_tf}")
        print(f"✓ Confianza promedio: {np.mean([np.max(p) for p in probas_tf]):.3f}")
        
except Exception as e:
    print(f"✗ Error: {e}")
    time_tf = None

# ============================================================================
# COMPARACIÓN
# ============================================================================
print("\n" + "="*70)
print("  RESULTADOS DE LA COMPARACIÓN")
print("="*70)

if time_sk and time_tf:
    speedup = time_sk / time_tf
    print(f"\n⏱️  Velocidad:")
    print(f"   Scikit-learn: {time_sk*1000:.2f} ms")
    print(f"   TensorFlow:   {time_tf*1000:.2f} ms")
    if speedup > 1:
        print(f"   → Scikit-learn es {speedup:.1f}x más rápido")
    else:
        print(f"   → TensorFlow es {1/speedup:.1f}x más rápido")
    
    print(f"\n📊 Predicciones:")
    print(f"   Coincidencias: {sum(predictions_sk == predictions_tf)}/{len(test_texts)}")
    
    print(f"\n💡 Recomendación:")
    if speedup > 1.5:
        print("   → Usar Scikit-learn para este dataset pequeño")
    elif speedup < 0.7:
        print("   → TensorFlow es más eficiente")
    else:
        print("   → Ambos modelos tienen rendimiento similar")
        print("   → TensorFlow ofrece mejor escalabilidad a futuro")

print("\n" + "="*70)
print("  Comparación completada")
print("="*70 + "\n")
