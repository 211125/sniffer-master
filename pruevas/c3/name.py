from scapy.layers.l2 import E, ARP
from scapy.utils import wrpcap
import urllib.request
import re
from scapy.layers.l2 import Ether
import datetime

# load OUI database from IEEE
oui_url = 'https://raw.githubusercontent.com/wireshark/wireshark/master/manuf'
oui_file = 'oui.txt'
urllib.request.urlretrieve(oui_url, oui_file)

# parse OUI database
oui_dict = {}
with open(oui_file, 'r') as f:
    for line in f:
        match = re.match('^([0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2})\s+\(base 16\)\s+(.*)', line)
        if match:
            oui_dict[match.group(1)] = match.group(2)

# callback function - called for every packet
def traffic_monitor_callback(pkt):
    if ARP in pkt:
        # sniff variables
        ip_src = pkt[ARP].psrc
        mac_src = pkt[Ether].src
        tam_src = pkt[Ether].len

        # get current date
        fecha = datetime.datetime.now().date()
        hora = datetime.datetime.now().time()

        # get device name from MAC address
        oui_prefix = mac_src[:8].upper().replace(':', '-')
        device_name = oui_dict.get(oui_prefix, 'Unknown')

        # print on console the data got from the sniffers
        print(ip_src)
        print(tam_src)
        print(mac_src)
        print(device_name)

        # commit the data to db
        cursor.execute(add_all, (mac_src, ip_src, tam_src, fecha, hora, device_name,))
        conexion.commit()

# sql command to create table if it doesn't exist
create_table = '''
CREATE TABLE IF NOT EXISTS sniff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mac_src VARCHAR(20),
    ip_src VARCHAR(20),
    tam_src INT,
    fecha DATE,
    hora TIME,
    device_name VARCHAR(100)
)
'''

# sql command to insert data into table
add_all = ("INSERT INTO sniff(mac_src,ip_src, tam_src, fecha, hora, device_name) VALUES (%s, %s, %s, %s, %s, %s)")

# modify GET endpoints to include device_name field
get_all = ("SELECT * FROM sniff")
get_sniff_by_date = ("SELECT * FROM sniff WHERE fecha = %s")
get_sniff_by_mac = ("SELECT * FROM sniff WHERE mac_src = %s")

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
            'hora': str(row[5]),
            'device_name': row[6]
        })
    return jsonify(json_data)


