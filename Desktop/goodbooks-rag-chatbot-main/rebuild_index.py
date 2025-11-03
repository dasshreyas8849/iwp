# rebuild_index.py
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
import pandas as pd

# Load your dataset (qa_samples.xlsx)
df = pd.read_excel("chatbot/qa_samples.xlsx")

# Combine 'Question' and 'Answer' columns if they exist
if 'Question' in df.columns and 'Answer' in df.columns:
    texts = [f"Q: {q}\nA: {a}" for q, a in zip(df['Question'], df['Answer'])]
else:
    # fallback if column names differ
    texts = [str(row) for _, row in df.iterrows()]

# Create and save the FAISS vectorstore
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_texts(texts, embeddings)
vectorstore.save_local("chatbot/faiss_index")

print("✅ FAISS index rebuilt successfully and saved to chatbot/faiss_index/")
