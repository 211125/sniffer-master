#from flask import Flask, request,jsonify
from flask import Blueprint, request,jsonify
from model.modelUser import crear_tabla
from config.config import conexion

app1_bp = Blueprint('app1', __name__)


cursor = conexion.cursor()
crear_tabla()



get_all = ("SELECT * FROM usuarios")

@app1_bp.route('/usuarios', methods=['POST'])
def crear_usuario():
    # Obtener los datos JSON enviados
    datos_json = request.get_json()
    correo = datos_json['correo']
    contraseña = datos_json['contraseña']
    nombre_completo = datos_json['nombre_completo']
    telefono = datos_json['telefono']
    
    # Insertar los datos en la tabla
    cursor.execute('INSERT INTO usuarios (correo, contraseña, nombre_completo, telefono) VALUES (%s, %s, %s, %s)', (correo, contraseña, nombre_completo, telefono))
    conexion.commit()
    
    # Responder con un mensaje de éxito
    return 'Usuario creado correctamente'

@app1_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    # get all data from the usuarios table
    cursor.execute(get_all)
    data = cursor.fetchall()

    # convert data to JSON format
    json_data = []
    for row in data:
        json_data.append({
            'id': row[0],
            'correo': row[1],
            'contraseña': row[2],
            'nombre_completo': row[3],
            'telefono': row[4]
        })
    return jsonify(json_data)

