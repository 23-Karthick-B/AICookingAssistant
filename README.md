# AI Cooking Assistant

An AI-powered cooking assistant that generates recipes, suggests meals, and provides cooking instructions based on user provided ingredients.

---

## 🌐 Live Demo

🔗 https://ai-cooking-assistant-ashy.vercel.app/

---

##  Features

- **AI Recipe Generation** – Generate recipes dynamically using ingredients  
- **Ingredient-Based Suggestions** – Discover dishes from available items  
- **Structured Cooking Instructions** – Clear, step-by-step guidance  
- **Interactive Assistant** – Chat-like experience for users  
- **Fast Backend APIs** – Built with Spring Boot  
- **Full-Stack Deployment** – Frontend (Vercel) + Backend (Render)  

---

## 🛠️ Tech Stack

### Backend
- Java  
- Spring Boot  
- REST APIs  
- Maven  

### Frontend
- JavaScript  
- HTML, CSS  

### Deployment
- Vercel (Frontend)  
- Render (Backend)  
- Docker  

---

## How It Works

1. User enters ingredients (e.g., "egg, rice, tomato")  
2. Frontend sends request to backend API  
3. Backend processes input and calls AI service  
4. AI generates recipe + instructions  
5. Response is returned and displayed to the user  

---

## 🔗 API Design

**Request Body:**
```json
{
  "ingredients": ["chicken", "rice", "onion"]
}
{
  "recipeName": "Chicken Fried Rice",
  "ingredients": [
    "chicken",
    "rice",
    "onion",
    "soy sauce"
  ],
  "steps": [
    "Cook the rice",
    "Saute onions",
    "Add chicken and cook thoroughly",
    "Mix rice and add soy sauce"
  ]
}
Frontend (Vercel)
        ↓
REST API (Spring Boot - Render)
        ↓
AI Processing Layer
        ↓
Response (Recipe + Steps)

👨‍💻 Author

Karthick
GitHub: https://github.com/23-Karthick-B
