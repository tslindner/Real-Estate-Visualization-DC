from flask import Flask, render_template, redirect
from flask_restful import Resource, Api

import pandas as pd
import pymongo

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.real_estate_dc
collection = db.data

app = Flask(__name__)
api = Api(app)

real_estate_list = pd.read_csv("input_data/real_estate.csv")
real_estate_list = real_estate_list.rename(index=str, columns={"$/SQUARE FEET": "SQUARE FEET 2", "URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)": "URL"})
real_estate_list = real_estate_list.to_json(orient="records")


# @app.route("/scrape")
# def scraper():

#     collection.drop()

#     results = scrape()
    
#     collection.insert_one(results)

#     return redirect("..")
    
@app.route("/")
def home():
    
    # data = list(collection.find())
    
    return render_template("index.html")

class input_data(Resource):
    def get(self):

        return real_estate_list


        # for real_estate_document in real_estate_list:
        #     collection.insert_one(real_estate_document)

        # data = collection.find()
        # return data

api.add_resource(input_data, '/resource')


# class HelloWorld(Resource):
#     def get(self):
#         return {'hello': 'world'}

# api.add_resource(HelloWorld, '/resource')
    

    

if __name__ == '__main__':
    app.run()