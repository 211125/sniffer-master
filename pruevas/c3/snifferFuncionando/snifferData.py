from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# connection to database
conexion = mysql.connector.connect(user='root', password='211125', host='127.0.0.1', database='arquitectura')

# sql command to select data from table by date
select_by_date = "SELECT * FROM sniff WHERE fecha = %s"

# create GET endpoint to retrieve data by date
@app.route('/sniff/<string:date>', methods=['GET'])
def get_sniff_by_date(date):
    cursor = conexion.cursor()
    cursor.execute(select_by_date, (date,))
    data = cursor.fetchall()
    cursor.close()
    if data:
        return jsonify(data)
    else:
        return "No data found for the date provided."

if __name__ == '__main__':
    app.run(debug=True)
