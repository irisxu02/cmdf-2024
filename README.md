# Explain it EMILI
Project for cmd-f "Western Canada's Largest Hackathon Celebrating Underrperesented Genders in Tech" (Mar 9 – 10, 2024)

**DOUBLE PRIZE-WINNER**
* Redbrick Driving Accessibility and Inclusive Design (only winner)
* Best Use of Cohere API (3rd place out of 3)

## Running locally

Add API keys in a `.env` file (in `backend` folder)
```
CO_API_KEY=<your_cohere_api_key>
```

Create virtual environment (optional but recommended!)
```
python -m venv venv\
source venv/bin/activate
```

Install requirements
```
pip install -r requirements.txt
```

To run backend + frontend:
- in `backend` folder: ```python server.py```
    - to see backend: http://127.0.0.1:4999/data
- in `frontend` folder: ```npm start```


## Running with Docker

```
docker-compose up
```
