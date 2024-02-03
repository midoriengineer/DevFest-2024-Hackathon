from flask import Flask, jsonify  # Import the jsonify function from the flask module
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/key')
def hello_world():
    return jsonify(key='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')


if __name__ == '__main__':
    app.run(debug=True)