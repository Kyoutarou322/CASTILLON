import pandas as pd
import pyodbc
from datetime import datetime
import os

# Datos de conexión
server = '26.197.3.252'
database = 'SISTEMA_LANDMECH'
username = 'nestor'
password = '123'

# Cadena de conexión ODBC
conn_str = (
    f'DRIVER={{ODBC Driver 17 for SQL Server}};'
    f'SERVER={server};'
    f'DATABASE={database};'
    f'UID={username};'
    f'PWD={password};'
    f'TrustServerCertificate=yes;'
)

# Conectar
try:
    conn = pyodbc.connect(conn_str)
    print(" Conectado a SQL Server")
except Exception as e:
    print(" Error de conexión:", e)
    exit()

# Lista de tablas
tablas = [
    "almacenes",
    "inventarios",
    "productos",
    "proveedores",
    "registro_acciones_inventario",
    "usuarios"
]

# Ruta absoluta en la misma carpeta donde está este script
ruta_actual = os.path.dirname(os.path.abspath(__file__))
ruta_excel = os.path.join(ruta_actual, "dashboard_landmech.xlsx")

# Extraer y guardar datos
try:
    with pd.ExcelWriter(ruta_excel, engine='openpyxl') as writer:
        for tabla in tablas:
            df = pd.read_sql(f"SELECT * FROM {tabla}", conn)
            df.to_excel(writer, sheet_name=tabla.capitalize(), index=False)
    print(f" Excel generado correctamente en: {ruta_excel} ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')})")

except Exception as e:
    print(" Error al generar Excel:", e)
finally:
    conn.close()
