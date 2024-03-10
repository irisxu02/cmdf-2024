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
    

response = co.chat(
  chat_history=[
    {"role": "SYSTEM", "message": "You are a teacher on a mission to educate people of all ages and backgrounds using your wide array of knowledge across domains."},
    {"role": "USER", "message": "Who discovered gravity?"},
    {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
  ],
  message="What year was he born?",
  connectors=[{"id": "web-search"}]
)
print(response.text)
with open("chat_history.json", "w") as file:
    json.dump(response.chat_history, file, indent=4)

text=document_processor.get_text()
response = co.summarize(
    text=text,
    model='command',
    length='medium',
    extractiveness='medium'
)
with open("response.json", "w") as file:
    json.dump(response, file)
summary = response.summary
print(summary)