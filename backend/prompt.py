import cohere
from dotenv import load_dotenv
import os
import requests
import json
import document_processor

load_dotenv()
cohere_key = os.getenv('CO_API_KEY')
co = cohere.Client(cohere_key)


def fetch_answer(question_input):
    response = co.chat(
        message=question_input,
        connectors=[{"id": "web-search"}]
    )
    return response.text