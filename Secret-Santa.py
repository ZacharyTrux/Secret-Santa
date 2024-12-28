from flask import Flask, render_template

app = Flask(__name__)

@app.route("/about")
def aboutPage():
    return render_template('about.html')

@app.route("/create-your-list")
def creationPage():
    return render_template('createList.html')

@app.route("/look-at-lists")
def lookAtListsPage():
    return render_template('lookList.html')

@app.route('/')
def homePage():
    return render_template('home.html')

if(__name__ == '__main__'):
    app.run(host='0.0.0.0', port = '5000', debug=True)
    