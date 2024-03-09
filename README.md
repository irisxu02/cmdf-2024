# cmdf-2024

Add API keys in a `.env` file
```
CO_API_KEY=<your_cohere_api_key>
```

Create virtual environment
```
python -m venv venv\
source venv/bin/activate
```

Install requirements
```
pip install -r requirements.txt
```

To run backend + frontend:
- in backend folder: ```python server.py```
    - to see backend: http://127.0.0.1:4999/data
- in frontend folder: ```npm start```
