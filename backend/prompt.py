import cohere


class KnowledgeExpert:
    def __init__(self, cohere_key):
        self.co = cohere.Client(cohere_key)
        self.user_categories = {
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
        self.format_preference = "paragraph" # default

    def set_format_preference(self, format):
        self.format_preference = {"point form": "short point form, limited to 3-5 bullet points",
                                  "paragraph": "paragraph form, 3-5 sentences",
                                  "page": "comprehensive, detailed explanation, 10+ sentences"}.get(format, "paragraph")
        self.max_tokens = {"point form": 250,
                            "paragraph": 500,
                            "page": 1000}.get(format, 500)
        print(f"format: {self.format_preference}")
    
    def test_simple_response(self, question_input, type=None, max_tokens=1250):
        response = self.co.chat(
            message="explain gravity like I am a kid, in point form",
            preamble="You are an expert teacher on a mission to educate people of all ages and backgrounds using your wide array of knowledge across domains, giving explanations as short and simple or in-depth and complex as the user can understand at their level. You never ask questions, only answer them.",
            connectors=[{"id": "web-search"}],
            max_tokens=self.max_tokens,
        )
        return response
    
    def fetch_response(self, question_input, type=None, role=None):
        message = self.create_prompt(question_input, type)
        # TODO: get max_tokens based on user preference
        response = self.co.chat(
            message=message,
            preamble="You are an expert teacher on a mission to educate people of all ages and backgrounds using your wide array of knowledge across domains, giving explanations as short and simple or in-depth and complex as the user can understand at their level. You never ask questions, only answer them.",
            connectors=[{"id": "web-search"}],
            max_tokens=self.max_tokens,
        )
        print(message)
        return response

    
    def create_prompt(self, question_input, type=None):
        if type is None:
            return f"Explain {question_input}."

        prompt_primer = ""
        if type in self.user_categories:
            user_details = self.user_categories[type]
            # This swap helps create better responses
            if type == "adult":
                type = "pro"
            if type == "toddler":
                type = "baby"
            prompt_primer = f'I am a {type}. My vocabulary level is {user_details["vocabulary"]} and I have {user_details["education"]} and my knowledge includes {user_details["knowledge_base"]}. I relate to {user_details["motivation"]}. '
        else:
            prompt_primer = f'I am a {type}. '
        question = f"Explain {question_input}, in {self.format_preference}."
        return prompt_primer + question

    def list_citations(self, response):
        urls = []
        for d in response.documents:
            urls.append(d["url"])
        return urls
