from flask import Flask, jsonify, make_response, request
import prompt
from io import BytesIO
import os
import pdfkit

app = Flask(__name__)

# Helper function to set CORS headers
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

@app.route('/upload', methods=['GET', 'POST', 'OPTIONS'])
def get_upload():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response()), 200
    if request.method == 'POST':
        d = {}
        file = request.files['pdfFile']
        filename = file.filename
        print(f"Uploading file {filename}")
        file_bytes = file.read()
        file_content = BytesIO(file_bytes).readlines()
        
        # Save the file as PDF
        upload_dir = os.path.join(os.getcwd(), 'uploads')
        os.makedirs(upload_dir, exist_ok=True) 
        pdf_filename = os.path.join(upload_dir, filename)
        with open(pdf_filename, 'wb') as f:
            f.write(file_bytes)

        d['status'] = 1
        return add_cors_headers(jsonify("PDF Received"))
    
@app.route('/data', methods=['GET', 'POST', 'OPTIONS'])
def get_data():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response()), 200
    if request.method == 'POST':
        data = request.json
        print(data["ageGroup"])
        print(data["role"])
        print(data["length"])
        print(f'READ INPUT: {data["inputValue"]}')
        response = prompt.fetch_response(data["inputValue"])
        print(f"COHERE RESPONSE: {response.text}")
        citations = prompt.list_citations(response)
        response_with_citations = {
        "text": response.text,
        "citations": citations
    }
        return add_cors_headers(jsonify(response_with_citations))

# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4999, debug=True)
