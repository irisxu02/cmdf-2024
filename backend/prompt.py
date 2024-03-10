import cohere
from dotenv import load_dotenv
import os
import requests
import json
import document_processor

load_dotenv()
cohere_key = os.getenv('CO_API_KEY')
co = cohere.Client(cohere_key)

user_categories = {
    "toddler": {
        "vocabulary": "baby words, mostly related to common objects and basic human needs",
        "education": "stimulating interaction with parents",
        "knowledge_base": "basic concepts like colors, shapes, numbers (often up to 5 or 10), and simple spatial relations (such as in, on, under)",
        "motivation": "understanding the environment through fundamental senses",
        "example_chat": "question: Explain gravity. answer: Gravity is what makes things fall down. It's like when you drop a toy and it goes boom. It's what keeps us on the ground."
    },
    "child": {
        "vocabulary": "fun, childlike, basic words and simple logic",
        "education": "early stages informal learning through play and exploration",
        "knowledge_base": "growing understanding of colors, shapes, numbers (typically up to 20), basic math concepts, spatial relationships, and social skills such as sharing and taking turns",
        "motivation": "exploring and understanding the world through sensory experiences and curiosity",
        "example_chat": "question: Explain gravity. answer: Gravity is what makes things fall down. It's like when you drop a toy and it goes boom. It's what keeps us on the ground."
    },
    "teenager": {
        "vocabulary": "slang, technical terms, and abstract concepts",
        "education": "formal schooling, self-directed learning, and peer influence",
        "knowledge_base": "advanced understanding of academic subjects, abstract thinking, complex social dynamics, critical thinking skills, and developing personal identity",
        "motivation": "seeking independence, social acceptance, personal growth, and exploration of interests and passions"
    },
    "adult": {
        "vocabulary": "detailed, professional jargon, and specialized terms",
        "education": "formal education, ongoing learning through work and life experiences",
        "knowledge_base": "expertise in specific fields, life skills, cultural awareness, emotional intelligence, financial literacy, and decision-making abilities",
        "motivation": "career advancement, personal fulfillment, maintaining relationships, achieving goals, and contributing to society"
    }
}


def fetch_response(question_input, type=None, max_tokens=1250):
    message = create_prompt(question_input, type)
    response = co.chat(
        message=message,
        preamble="You are an expert teacher on a mission to educate people of all ages and backgrounds using your wide array of knowledge across domains, giving explanations as short and simple or in-depth and complex as the user can understand at their level. You never ask questions, only answer them.",
        connectors=[{"id": "web-search"}]
        max_tokens=max_tokens,
    )
    print(message)
    return response


def create_prompt(question_input, type=None):
    if type is None:
        return f"Explain {question_input}."
    
    prompt_primer = ""
    if type in user_categories:
        user_details = user_categories[type]
        
        # This swap helps create better responses
        if type == "adult":
            type = "pro"
        if type == "toddler":
            type = "baby"
        prompt_primer = f'I am a {type}. My vocabulary level is {user_details["vocabulary"]} and I have {user_details["education"]} and my knowledge includes {user_details["knowledge_base"]}. I am motivated by {user_details["motivation"]}.'
    # based on user characteristics (age, role)
    # based on user given list of prior knowledge
    question = f"Explain {question_input} to me like I am a {type}."
    return prompt_primer + question


def list_citations(response):
    urls = []
    for d in response.documents:
        urls.append(d["url"])
    return urls


#fetch_response("general relativity", "adult")