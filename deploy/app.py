from flask import Flask , render_template 

app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/')
def main():
    return app.send_static_file('index.html', color='w')

if __name__ == '__main__':
    app.run(debug=True)