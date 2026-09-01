# 🚀 AI Cooking Assistant - Quick Start Guide

## Access the Application

### Current Status
- ✅ **Backend**: Running on `http://localhost:8080`
- ✅ **Frontend**: Running on `http://localhost:3001`

### Open in Browser
👉 **http://localhost:3001**

---

## 📖 Application Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with features |
| Create Recipe | `/create` | Add ingredients & preferences |
| Recipe Results | `/recipes` | View AI-generated recipes |
| Recipe Details | `/recipes/:id` | Full recipe with instructions |
| Cooking Mode | `/cook/:id` | Step-by-step cooking guide |
| Favorites | `/favorites` | Your saved recipes |

---

## 🎯 Quick User Journey

1. **Home Page** → Click "Start Cooking 🚀"
2. **Create Recipe** → Add ingredients, select preferences, click "Suggest Recipes"
3. **Recipe Results** → View recipes, ❤️ to save, click to view details
4. **Recipe Details** → Read full recipe, click "Start Cooking 🍳"
5. **Cooking Mode** → Follow steps, use timer, complete cooking
6. **Favorites** → Access saved recipes anytime

---

## 💡 Key Features

- ✅ **Beautiful Multi-Page UI** - Professional design
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Recipe Search** - Filter by name
- ✅ **Favorites** - Save recipes (localStorage)
- ✅ **Cooking Timer** - 5, 10, 15-minute presets
- ✅ **Cooking Mode** - Full-screen, distraction-free
- ✅ **Step Navigation** - Easy step-by-step progression
- ✅ **Error Handling** - Clear error messages
- ✅ **Loading States** - Professional "Chef AI is preparing..." message

---

## 🔧 If You Need to Restart

### Stop Current Servers
```bash
# Press Ctrl+C in both terminals running backend and frontend
```

### Restart Backend
```bash
cd /Users/karthick/Documents/Projects/AiCookingAssistant/backend
export AI_API_KEY="your-api-key-here"
./mvnw spring-boot:run
```

### Restart Frontend
```bash
cd /Users/karthick/Documents/Projects/AiCookingAssistant/frontend
npm start
```

---

## 📝 Testing Checklist

Try these actions to verify everything works:

- [ ] Load home page (`/`)
- [ ] Click "Start Cooking" button
- [ ] Add ingredients on create page
- [ ] Select all preferences (cuisine, meal type, diet, difficulty)
- [ ] Click "Suggest Recipes"
- [ ] See loading state with chef animation
- [ ] View generated recipes
- [ ] ❤️ a recipe to favorite it
- [ ] Click recipe to view details
- [ ] Click "Start Cooking" button
- [ ] Navigate through cooking steps
- [ ] Use timer feature
- [ ] Navigate to Favorites page
- [ ] See saved recipe in favorites
- [ ] Search in favorites
- [ ] ❤️ again to remove from favorites
- [ ] Refresh page - favorites still there (localStorage)

---

## 🎨 Customization Examples

### Change Theme Colors
Edit `src/style.css`:
```css
/* Change from orange (#c2410c) to your color */
background: linear-gradient(135deg, #7c2d12, #YOUR_COLOR);
```

### Modify API Endpoint
Edit `src/services/api.js`:
```javascript
export async function fetchRecipes(data) {
  const response = await fetch(`${API_BASE}/your-endpoint`, {
    // ...
  });
}
```

### Add More Cuisines
Edit `src/pages/CreateRecipePage.jsx`:
```javascript
const cuisineOptions = [
  "South Indian",
  "North Indian",
  // Add more here
  "Your Cuisine"
];
```

---

## 📱 Mobile Experience

The app is fully responsive:
- Hamburger menu on mobile
- Touch-friendly buttons
- Single-column layouts
- Optimized for small screens
- All features work on mobile

---

## 🔐 Environment Variables

Make sure to set the backend API key:
```bash
export AI_API_KEY="your-actual-openrouter-api-key"
```

Without this, the backend will fail to start.

---

## 📊 Component Architecture

```
App.js (Router)
├── Navbar (Navigation)
├── Routes
│   ├── HomePage
│   ├── CreateRecipePage
│   ├── RecipeResultsPage
│   ├── RecipeDetailsPage
│   ├── FavoritesPage
│   └── CookingModePage
├── Footer
└── All styled with style.css
```

---

## 🚀 Deployment

To build for production:
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## ✨ What's Included

### New Pages
- Home page with hero and features
- Create recipe page (improved from existing)
- Recipe results page with grid view
- Recipe details page with sidebar
- Favorites page with localStorage
- Cooking mode page with timer

### New Components
- Navbar with mobile menu
- Footer with links
- Favorite button
- Ingredient chips
- Loading state
- Empty state

### New Utilities
- Favorites localStorage management

### Styling
- Complete CSS rewrite
- Professional design system
- Responsive layouts
- Smooth animations
- Modern UI/UX

---

## 🎉 You're All Set!

Your AI Cooking Assistant is ready to use. Enjoy! 🍳

For detailed documentation, see: `FRONTEND_TRANSFORMATION_COMPLETE.md`
