from flask import Flask, render_template, redirect

import pandas as pd
import pymongo


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.real_estate_dc
collection = db.data

app = Flask(__name__)


@app.route("/scrape")
def scraper():

    real_estate_list = pd.read_csv("input_data/real_estate.csv")
    real_estate_list = real_estate_list.rename(index=str, columns={"$/SQUARE FEET": "SQUARE FEET 2", "URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)": "URL"})
    real_estate_list = real_estate_list.to_dict(orient='records')

    collection.drop()
    
    for real_estate_document in real_estate_list:
        collection.insert_one(real_estate_document)

    return redirect("..")
    
@app.route("/")
def home():
    
    data = list(collection.find())
    
    return render_template("index.html", data=data)
    

    

if __name__ == '__main__':
    app.run()