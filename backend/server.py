from flask import Flask, jsonify, make_response, request
import prompt


app = Flask(__name__)

# Helper function to set CORS headers
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

@app.route('/data', methods=['GET', 'POST', 'OPTIONS'])
def get_data():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response()), 200
    if request.method == 'POST':
        data = request.json
        print(data["inputValue"])
        answer = prompt.fetch_answer(data["inputValue"])
        print(answer)
        # handle data here
        return add_cors_headers(jsonify(data))

# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4999, debug=True)
