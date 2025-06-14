PERPLEXITY_API_KEY = "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"









from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
load_dotenv()  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("faq.txt", "r") as f:
    FAQ_CONTEXT = f.read()

class Query(BaseModel):
    question: str


PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
PERPLEXITY_MODEL = "sonar-pro"  

@app.post("/ask")
async def ask_faq(query: Query):
    prompt = f"""You are a technical assistant. Answer questions about this project's development using the following context:

{FAQ_CONTEXT}

For user questions about the project itself, focus ONLY on the above technical details.
For other questions, use the FAQ section below:

User question: {query.question}

Answer:"""
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": PERPLEXITY_MODEL,
        "messages": [
            {"role": "system", "content": "Be precise and concise."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 300,
        "temperature": 0.2
    }
    response = requests.post(PERPLEXITY_API_URL, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    
    answer = data["choices"][0]["message"]["content"].strip()
    return {"answer": answer}
