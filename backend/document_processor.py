from PyPDF2 import PdfReader
import pandas as pd
from io import StringIO


def get_text(pdf_path='demo_assets/EthicsofAI.pdf', pages=[1,2]):
    reader = PdfReader(pdf_path)
    parts = []

    def visitor_body(text, cm, tm, fontDict, fontSize):
        y = tm[5]
        if y > 50 and y < 750:
            parts.append(text)

    for i in pages:
        page = reader.pages[i]
        page.extract_text(visitor_text=visitor_body)
        text_body = " ".join(parts)

    return text_body


def process_text_input(text: str, run_id: str = None):  
	text = StringIO(text).read()  
	chunks = [text[i:i + CHUNK_SIZE] for i in range(0, len(text), CHUNK_SIZE)]
	df = pd.DataFrame.from_dict({'text': chunks})  
	return df


def embed(list_of_texts):  
	response = co_client.embed(model='small', texts=list_of_texts)  
	return response.embeddings


def top_n_neighbors_indices(prompt_embedding: np.ndarray, storage_embeddings: np.ndarray, n: int = 5):  
	if isinstance(storage_embeddings, list):  
		storage_embeddings = np.array(storage_embeddings)  
	if isinstance(prompt_embedding, list):  
		storage_embeddings = np.array(prompt_embedding)  
	similarity_matrix = prompt_embedding @ storage_embeddings.T / np.outer(norm(prompt_embedding, axis=-1), norm(storage_embeddings, axis=-1))  
	num_neighbors = min(similarity_matrix.shape[1], n)  
	indices = np.argsort(similarity_matrix, axis=-1)[:, -num_neighbors:]  
	return indices