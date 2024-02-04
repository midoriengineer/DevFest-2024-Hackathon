from flask import Flask, jsonify  # Import the jsonify function from the flask module
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/key')
def hello_world():
    return jsonify(key='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')


if __name__ == '__main__':
    app.run(debug=True)