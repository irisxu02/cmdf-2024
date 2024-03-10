from flask import Flask, jsonify, make_response, request
from io import BytesIO
import os
import pdfkit
from dotenv import load_dotenv
from prompt import KnowledgeExpert


app = Flask(__name__)
expert = None
expert_initialized = False

# Helper function to set CORS headers
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response


def init_expert():
    global expert, expert_initialized
    if not expert_initialized:
        load_dotenv()
        cohere_key = os.getenv('CO_API_KEY')
        expert = KnowledgeExpert(cohere_key)
        expert_initialized = True


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
    
@app.route('/basic', methods=['GET', 'POST', 'OPTIONS'])
def get_basic_data():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response()), 200
    if request.method == 'POST':
        data = request.json
        print(data["ageGroup"])
        print(f'READ INPUT: {data["inputValue"]}')
        response = expert.fetch_response(data["inputValue"])
        print(f"COHERE RESPONSE: {response.text}")
        citations = expert.list_citations(response)
        response_with_citations = {
        "text": response.text,
        "citations": citations
    }
        return add_cors_headers(jsonify(response_with_citations))
    
@app.route('/advanced', methods=['GET', 'POST', 'OPTIONS'])
def get_advanced_data():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response()), 200
    if request.method == 'POST':
        data = request.json
        print(data["ageGroup"])
        print(data["role"])
        print(data["length"])
        print(f'READ INPUT: {data["inputValue"]}')
        response = expert.fetch_response(data["inputValue"])
        print(f"COHERE RESPONSE: {response.text}")
        citations = expert.list_citations(response)
        response_with_citations = {
            "text": response.text,
            "citations": citations
        }
        return add_cors_headers(jsonify(response_with_citations))


# Running app
if __name__ == '__main__':
    init_expert()
    app.run(host='0.0.0.0', port=4999, debug=True)
