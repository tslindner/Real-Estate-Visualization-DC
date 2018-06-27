from bson import Binary, Code, json_util
from bson.json_util import dumps
from flask import Flask, render_template, redirect
from flask_restful import Resource, Api

import json
import pandas as pd
import pymongo


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.real_estate_dc
collection = db.data

app = Flask(__name__)
api = Api(app)


@app.route("/")
def home():
        
    return render_template("index.html")


@app.route("/data")
def scraper():

    collection.drop()

    real_estate_list = pd.read_csv("input_data/real_estate.csv")
    real_estate_list.fillna(value="N/A", inplace=True)
    real_estate_list = real_estate_list.rename(index=str, columns={"$/SQUARE FEET": "SQUARE FEET 2", "URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)": "URL"})
    real_estate_list = real_estate_list.to_dict(orient="records")

    collection.insert_many(real_estate_list)

    return redirect("..")


class input_data(Resource):
    def get(self):

        items = collection.find()

        items = list(items)

        return json.loads(dumps(items))

        # return [json.loads(json.dumps(item, indent=4, default=json_util.default))
        #         for item in items]

api.add_resource(input_data, '/resource')


if __name__ == '__main__':
    app.run()
