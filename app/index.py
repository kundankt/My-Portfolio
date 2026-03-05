from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# CORS taaki index.html API ko call kar sake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- PROJECT 1: Diffusion Model ---
@app.post("/api/diffusion/")
async def run_diffusion(prompt: str = Form(...)):
    time.sleep(1.5) 
    # Yahan diffusion model inference code aayega
    return {
        "status": "success", 
        "result": f"Generated output conceptually based on: '{prompt}'."
    }

# --- PROJECT 2: NLP Summarizer ---
@app.post("/api/nlp/")
async def run_nlp(text: str = Form(...)):
    time.sleep(1)
    summary = text[:40] + "..." if len(text) > 40 else text
    return {
        "status": "success", 
        "result": f"Summary: '{summary}'"
    }

# --- PROJECT 3: Vision AI ---
@app.post("/api/vision/")
async def run_vision(file: UploadFile = File(...)):
    time.sleep(2)
    return {
        "status": "success", 
        "result": f"Image '{file.filename}' processed. Detected key features."
    }

# --- PROJECT 4: PyTorch Predictor ---
@app.post("/api/predict/")
async def run_predict(data_val: float = Form(...)):
    time.sleep(1)
    # Yahan DataLoader logic lagaya ja sakta hai
    prediction = data_val * 2.5 
    return {
        "status": "success", 
        "result": f"Processed input {data_val}. Output prediction is {prediction}."
    }