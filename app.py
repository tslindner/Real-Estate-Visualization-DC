from flask import Flask, render_template, redirect
from scrape_mars import *
import pymongo

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.real_estate_dc
collection = db.data

app = Flask(__name__)


# @app.route("/scrape")
# def scraper():

#     collection.drop()

#     results = scrape()
    
#     collection.insert_one(results)

#     return redirect("..")
    
@app.route("/")
def home():
    
    data = list(collection.find())
    
    return render_template("index.html", data=data)
    

    

if __name__ == '__main__':
    app.run()