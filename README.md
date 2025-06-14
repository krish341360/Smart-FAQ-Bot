# Smart FAQ Bot

Smart FAQ Bot is a web-based application that allows users to ask questions about the project or general FAQs and receive instant answers powered by AI. The project consists of a React frontend and a FastAPI backend integrated with the Perplexity API.

## Features

- **Frontend**: Built with React, featuring a modern UI with CSS gradients and responsive design.
- **Backend**: Powered by FastAPI, with integration to Perplexity's `sonar-pro` model for AI-driven answers.
- **AI Integration**: Uses Perplexity API for generating precise and concise answers.
- **FAQ Context**: Provides answers based on a predefined FAQ knowledge base.

## Project Structure
smart-faq/ ├── architecture.mmd # Project architecture diagram (Mermaid format) ├── architecture.png # Project architecture diagram (Image format) ├── backend/ │ ├── .env # Environment variables (API key) │ ├── faq.txt # FAQ knowledge base │ ├── main.py # FastAPI backend │ ├── requirements.txt # Python dependencies ├── frontend/ │ ├── package.json # Frontend dependencies and scripts │ ├── public/ │ │ └── index.html # Frontend entry point │ ├── src/ │ ├── app.js # React UI components │ └── index.js # React app initialization


## Prerequisites

- **Backend**:
  - Python 3.10+
  - `pip` for managing Python packages
- **Frontend**:
  - Node.js 16+ and npm

## Setup Instructions

### 1. Clone the Repository

```bash```
git clone https://github.com/your-username/smart-faq.git
cd smart-faq

2. Backend Setup
Navigate to the backend directory:
cd backend

Install dependencies:
pip install -r requirements.txt

Create a .env file and add your Perplexity API key:
PERPLEXITY_API_KEY=your-api-key-here


Run the backend server:
uvicorn main:app --reload

The backend will be available at http://localhost:8000.

3. Frontend Setup
Navigate to the frontend directory:
cd ../frontend

Install dependencies:
npm install

Start the development server:
npm start

The frontend will be available at http://localhost:3000.

Usage
Open the frontend in your browser at http://localhost:3000.
Type a question in the input box and press "Ask" or hit Enter.
The bot will provide an answer based on the FAQ context or AI-generated responses.


Architecture
The project architecture is as follows:
flowchart LR
  A[React Frontend] -->|HTTP POST| B[FastAPI Backend]
  B -->|API Call| C[Perplexity LLM]
  B -->|Context| D[FAQ.txt]
