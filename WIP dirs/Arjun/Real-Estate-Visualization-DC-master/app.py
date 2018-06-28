# import necessary libraries
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)


df = pd.read_csv('data/real_estate.csv')

# Flask Setup
app = Flask(__name__)


@app.route("/names")
def names():
    # data load from csv file - pandas

    names_list=[zipNum for zipNum in set(df.ZIP.tolist())]
    return jsonify(names_list)


@app.route('/zipCode/<id>')
def samples(id):
    # data load from csv file - pandas

    zipC  = int(id)
    zipCT = df[df.ZIP == zipC]
    zipCT = zipCT['BEDS']

    zipCT.fillna(0, inplace=True)
    zipCT = zipCT.reset_index()
    zipCT.columns = ['Number', 'Beds']
    zipCT

    return jsonify(zipCT.to_dict('list'))






# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
