from flask import Flask, render_template
app = Flask(__name__)

PRODUCTS = {
    'iphone': {
        'name': 'iPhone 5S',
        'category': 'Phones',
        'price': 699,
    },
    'galaxy': {
        'name': 'Samsung Galaxy 5',
        'category': 'Phones',
        'price': 649,
    },
    'ipad-air': {
        'name': 'iPad Air',
        'category': 'Tablets',
        'price': 649,
    },
    'ipad-mini': {
        'name': 'iPad Mini',
        'category': 'Tablets',
        'price': 549
    }
}

@app.route('/csv_download/<filename>')
def csv_generator(filename):
    
    # Example 1
    # tv_show = "The Office"
    # return = render_template("index.html", show=tv_show)

    # Example 2
    # list = [31, 4, 23, 24, 45, 87, 76, 132, 66, 77]
    # return render_template("index.html", nums=list)

    # Example 3
    # user = user or 'Hasan'
    # return render_template('index.html', user=user)

@app.route('/home')
def home():
    return render_template('home.html', products=PRODUCTS)


@app.route('/product/<key>')
def product(key):
    product = PRODUCTS.get(key)
    if not product:
        abort(404)
    return render_template('product.html', product=product)


if __name__ == "__main__":
    app.run()