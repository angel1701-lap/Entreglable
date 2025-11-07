#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de prueba rápida para el modelo TensorFlow
"""
import sys
from pathlib import Path

print("="*70)
print("  TEST DEL MODELO TENSORFLOW")
print("="*70)

# Verificar archivos necesarios
print("\n[1] Verificando archivos del modelo...")
required_files = [
    'model_prioridad.h5',
    'model_tipo.h5',
    'model_artifacts.pkl',
    'model_metadata.json'
]

missing_files = []
for file in required_files:
    if Path(file).exists():
        print(f"  ✓ {file}")
    else:
        print(f"  ✗ {file} - NO ENCONTRADO")
        missing_files.append(file)

if missing_files:
    print("\n⚠️  ARCHIVOS FALTANTES")
    print("Ejecuta primero: python train.py")
    sys.exit(1)

# Cargar modelos
print("\n[2] Cargando modelos TensorFlow...")
try:
    import tensorflow as tf
    from tensorflow import keras
    import joblib
    import numpy as np
    import json
    
    print(f"  ✓ TensorFlow version: {tf.__version__}")
    
    # Cargar modelos
    model_prioridad = keras.models.load_model('model_prioridad.h5')
    model_tipo = keras.models.load_model('model_tipo.h5')
    print("  ✓ Modelos TensorFlow cargados")
    
    # Cargar artifacts
    artifacts = joblib.load('model_artifacts.pkl')
    vectorizer = artifacts['vectorizer']
    encoder_prioridad = artifacts['encoder_prioridad']
    encoder_tipo = artifacts['encoder_tipo']
    print("  ✓ Vectorizador y encoders cargados")
    
    # Cargar metadata
    with open('model_metadata.json', 'r', encoding='utf-8') as f:
        metadata = json.load(f)
    print("  ✓ Metadata cargada")
    
except Exception as e:
    print(f"  ✗ Error al cargar modelos: {e}")
    sys.exit(1)

# Probar predicciones
print("\n[3] Probando predicciones...")
test_cases = [
    {
        "texto": "solicitud urgente de licencia de construcción",
        "esperado_prioridad": "alta",
        "esperado_tipo": "licencia"
    },
    {
        "texto": "curriculum vitae ingeniero civil con experiencia",
        "esperado_prioridad": "media",
        "esperado_tipo": "cv"
    },
    {
        "texto": "denuncia grave por contaminación ambiental",
        "esperado_prioridad": "alta",
        "esperado_tipo": "denuncia"
    },
    {
        "texto": "solicitud de certificado de residencia",
        "esperado_prioridad": "baja",
        "esperado_tipo": "certificado"
    }
]

resultados = []
for i, test in enumerate(test_cases, 1):
    try:
        # Vectorizar
        X = vectorizer.transform([test["texto"]]).toarray()
        
        # Predecir prioridad
        prioridad_proba = model_prioridad.predict(X, verbose=0)[0]
        prioridad_idx = np.argmax(prioridad_proba)
        prioridad = encoder_prioridad.inverse_transform([prioridad_idx])[0]
        conf_prioridad = float(np.max(prioridad_proba))
        
        # Predecir tipo
        tipo_proba = model_tipo.predict(X, verbose=0)[0]
        tipo_idx = np.argmax(tipo_proba)
        tipo = encoder_tipo.inverse_transform([tipo_idx])[0]
        conf_tipo = float(np.max(tipo_proba))
        
        # Verificar resultado
        prioridad_ok = prioridad == test["esperado_prioridad"]
        tipo_ok = tipo == test["esperado_tipo"]
        
        print(f"\n  Test {i}: {test['texto'][:50]}...")
        print(f"    Prioridad: {prioridad} (esperado: {test['esperado_prioridad']}) {'✓' if prioridad_ok else '✗'}")
        print(f"    Tipo: {tipo} (esperado: {test['esperado_tipo']}) {'✓' if tipo_ok else '✗'}")
        print(f"    Confianza: {(conf_prioridad + conf_tipo)/2:.3f}")
        
        resultados.append({
            "prioridad_ok": prioridad_ok,
            "tipo_ok": tipo_ok,
            "confianza": (conf_prioridad + conf_tipo)/2
        })
        
    except Exception as e:
        print(f"  ✗ Error en test {i}: {e}")
        resultados.append({"prioridad_ok": False, "tipo_ok": False, "confianza": 0})

# Resumen
print("\n" + "="*70)
print("  RESUMEN DE RESULTADOS")
print("="*70)

total_tests = len(resultados)
prioridad_correctas = sum(1 for r in resultados if r["prioridad_ok"])
tipo_correctas = sum(1 for r in resultados if r["tipo_ok"])
confianza_promedio = sum(r["confianza"] for r in resultados) / total_tests

print(f"\n  Tests ejecutados: {total_tests}")
print(f"  Prioridad correcta: {prioridad_correctas}/{total_tests} ({prioridad_correctas/total_tests*100:.1f}%)")
print(f"  Tipo correcto: {tipo_correctas}/{total_tests} ({tipo_correctas/total_tests*100:.1f}%)")
print(f"  Confianza promedio: {confianza_promedio:.3f}")

# Metadata
print(f"\n  Metadata del modelo:")
print(f"    - Accuracy prioridad: {metadata['accuracy_prioridad']:.3f}")
print(f"    - Accuracy tipo: {metadata['accuracy_tipo']:.3f}")
print(f"    - Clases prioridad: {metadata['clases_prioridad']}")
print(f"    - Clases tipo: {metadata['clases_tipo']}")

# Conclusión
print("\n" + "="*70)
if prioridad_correctas >= total_tests * 0.75 and tipo_correctas >= total_tests * 0.75:
    print("  ✅ MODELO FUNCIONANDO CORRECTAMENTE")
    print("="*70)
    print("\n  Próximo paso: Iniciar API con 'python api_ml.py'")
    sys.exit(0)
else:
    print("  ⚠️  MODELO NECESITA MEJORAS")
    print("="*70)
    print("\n  Recomendación: Agregar más datos de entrenamiento")
    sys.exit(1)
