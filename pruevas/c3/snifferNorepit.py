from scapy.all import *
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS
import datetime
from scapy.layers.l2 import Ether, ARP
import datetime

# Configurar la conexión a la base de datos
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="211125",
  database="arquitectura"
)

# Crear un cursor para ejecutar consultas en la base de datos
cursor = mydb.cursor()

# Definir la función de devolución de llamada para monitorear el tráfico
def traffic_monitor_callback(pkt):
    global cursor
    if ARP in pkt and pkt[ARP].op in (1,2):
        mac_src = pkt.sprintf("%ARP.hwsrc%")
        ip_src = pkt.sprintf("%ARP.psrc%")
        try:
            cursor.execute("SELECT * FROM sniff WHERE mac_src = %s AND ip_src = %s", (mac_src, ip_src))
            result = cursor.fetchall()
            if not result:
                cursor.execute("INSERT INTO sniff (mac_src, ip_src) VALUES (%s, %s)", (mac_src, ip_src))
                mydb.commit()
                print(mac_src)
                print(ip_src)

        except Exception as e:
            print(e)
    while cursor.nextset():
        pass

# Definir la ruta de Flask para iniciar el escaneo de sniffing
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
get_all = ("SELECT * FROM sniff")


@app.route('/sniff', methods=['GET'])
def get_sniff():
    # get all data from the sniff table
    cursor.execute(get_all)
    data = cursor.fetchall()

    # convert data to JSON format
    json_data = []
    for row in data:
        json_data.append({
            'id': row[0],
            'mac_src': row[1],
            'ip_src': row[2],
            'tam_src': row[3],
            'fecha': str(row[4]),
            'hora': str(row[5])
        })
    return jsonify(json_data)

@app.route('/sniff', methods=['POST'])
def run_sniff():
    sniff(prn=traffic_monitor_callback, filter='arp', store=0, timeout=30)
    return "Sniffing finalizado."

if __name__ == '__main__':
    app.run()

