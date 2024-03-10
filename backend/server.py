from flask import Flask, jsonify, make_response, request, send_from_directory
from io import BytesIO
import os
import pdfkit
from dotenv import load_dotenv
from prompt import KnowledgeExpert
from document_processor import get_text

app = Flask(__name__, static_folder='../frontend/build')
expert = None  # the object that queries the cohere API
expert_initialized = False  # flag to check if the expert object has been initialized TODO: improve this
pdf_uploaded = None  # global flag to store the uploaded pdf file path


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


# Helper function to get file extension
def get_file_extension(filename):
    root, extension = os.path.splitext(filename)
    return extension[1:]


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


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
        # Save the file as PDF in uploads folder
        upload_dir = os.path.join(os.getcwd(), 'uploads')
        os.makedirs(upload_dir, exist_ok=True) 
        pdf_filename = os.path.join(upload_dir, filename)
        with open(pdf_filename, 'wb') as f:
            f.write(file_bytes)

        d['status'] = 1
        pdf_uploaded = pdf_filename
        return add_cors_headers(jsonify("PDF Received"))
    
@app.route('/basic', methods=['GET', 'POST', 'OPTIONS'])
def get_basic_data():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response()), 200
    if request.method == 'POST':
        data = request.json
        print(data["ageGroup"])
        print(f'READ INPUT: {data["inputValue"]}')
        
        if pdf_uploaded and data["inputValue"] in pdf_uploaded:
            text = get_text(pdf_uploaded)
            response = expert.fetch_response(text)
        else:
            pdf_uploaded = None
            response = expert.test_simple_response(data["inputValue"])  # TODO: use fetch_response
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
        print(data["ageGroup"]) # "baby", "child", "teen", "adult"
        print(data["role"]) # Any
        print(data["length"]) # point form, sentence, paragraph
        expert.set_format_preference(data["length"])
        print(f'READ INPUT: {data["inputValue"]}')

        # pdf mode
        if pdf_uploaded and data["inputValue"] in pdf_uploaded:
            text = get_text(pdf_uploaded)
            response = expert.fetch_response(text, type=data["ageGroup"], role=data["role"])
        else: # text input only mode
            pdf_uploaded = None
            response = expert.fetch_response(data["inputValue"], type=data["ageGroup"], role=data["role"])
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
    
