from scapy.all import *
import mysql.connector
import datetime
from flask import Flask, request

# create Flask app
app = Flask(__name__)

# connection to database
conexion = mysql.connector.connect(user='root', password='211125', host='127.0.0.1', database='arquitectura')

# writer function
cursor = conexion.cursor()

# sql command to create table if it doesn't exist
create_table = '''
CREATE TABLE IF NOT EXISTS sniff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mac_src VARCHAR(20),
    mac_des VARCHAR(20),
    ip_src VARCHAR(20),
    tam_src INT,
    ip_des VARCHAR(20),
    tam_des INT,
    fecha DATE
)
'''

# execute create table command
cursor.execute(create_table)

# sql command to insert data into table
add_all = ("INSERT INTO sniff(mac_src, mac_des, ip_src, tam_src, ip_des, tam_des, fecha) VALUES (%s, %s, %s, %s, %s, %s, %s)")

get_all = ("SELECT * FROM sniff")

# callback function - called for every packet
def traffic_monitor_callback(pkt):

    if "IP" in pkt:

        # sniff variables
        ip_src = pkt["IP"].src
        tam_ip_src = pkt["IP"].len
        ip_des = pkt["IP"].dst
        tam_ip_des = pkt["IP"].len
        mac_src = pkt.src
        mac_des = pkt.dst
        
        # get current date
        fecha = datetime.datetime.now().date()

        # print on console the data got from the sniffers
        print(ip_src)
        print(tam_ip_src)
        print(ip_des)
        print(tam_ip_des)
        print(mac_src)
        print(mac_des)

        # commit the data to db
        cursor.execute(add_all, (mac_src, mac_des, ip_src, tam_ip_src, ip_des, tam_ip_des, fecha,))
        conexion.commit()

# create POST endpoint
@app.route('/sniff', methods=['POST'])
def run_sniff():
    # capture traffic
    sniff(prn=traffic_monitor_callback, store=0, timeout=30)
    return "Sniff completed."

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
if __name__ == '__main__':
    app.run(debug=True)

@app.route('/sniff', methods=['GET'])
def get_sniff():
    # get all data from the sniff table
    cursor.execute(get_all)
    data = cursor.fetchall()
    return str(data)