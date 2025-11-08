#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script para probar la conexión a MySQL
"""
import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "municipalidad_db")

print("="*60)
print("PRUEBA DE CONEXIÓN A MYSQL")
print("="*60)
print(f"\nHost: {DB_HOST}")
print(f"Puerto: {DB_PORT}")
print(f"Usuario: {DB_USER}")
print(f"Base de datos: {DB_NAME}")
print()

# Intentar conectar sin especificar base de datos
print("[1/3] Probando conexión al servidor MySQL...")
try:
    connection = pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD
    )
    print("✓ Conexión al servidor MySQL exitosa")
    
    # Verificar si la base de datos existe
    print(f"\n[2/3] Verificando si existe la base de datos '{DB_NAME}'...")
    cursor = connection.cursor()
    cursor.execute("SHOW DATABASES")
    databases = [db[0] for db in cursor.fetchall()]
    
    if DB_NAME in databases:
        print(f"✓ Base de datos '{DB_NAME}' encontrada")
    else:
        print(f"✗ Base de datos '{DB_NAME}' NO encontrada")
        print(f"\nBases de datos disponibles:")
        for db in databases:
            print(f"  - {db}")
        print(f"\n⚠️  SOLUCIÓN: Ejecuta el script 'init_db.sql' en phpMyAdmin")
        connection.close()
        exit(1)
    
    # Conectar a la base de datos específica
    print(f"\n[3/3] Conectando a la base de datos '{DB_NAME}'...")
    connection.select_db(DB_NAME)
    
    # Verificar tablas
    cursor.execute("SHOW TABLES")
    tables = [table[0] for table in cursor.fetchall()]
    
    if tables:
        print(f"✓ Conexión exitosa. Tablas encontradas:")
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"  - {table}: {count} registros")
    else:
        print(f"⚠️  Base de datos '{DB_NAME}' existe pero no tiene tablas")
        print(f"    Ejecuta el script 'init_db.sql' en phpMyAdmin")
    
    cursor.close()
    connection.close()
    
    print("\n" + "="*60)
    print("✓ CONEXIÓN EXITOSA - TODO FUNCIONA CORRECTAMENTE")
    print("="*60)
    
except pymysql.err.OperationalError as e:
    print(f"✗ Error de conexión: {e}")
    print("\n⚠️  POSIBLES CAUSAS:")
    print("  1. MySQL no está corriendo en XAMPP")
    print("  2. Usuario o contraseña incorrectos")
    print("  3. Puerto incorrecto")
    print("\n💡 SOLUCIONES:")
    print("  1. Abre XAMPP Control Panel")
    print("  2. Inicia MySQL (botón 'Start')")
    print("  3. Verifica que el puerto sea 3306")
    exit(1)
    
except Exception as e:
    print(f"✗ Error inesperado: {e}")
    exit(1)
