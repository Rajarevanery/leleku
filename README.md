# 🐟 Leleku — Learning Platform

Leleku is a full-stack learning platform built with **React + TypeScript (Vite)** on the frontend and **Express + Prisma + PostgreSQL** on the backend. It includes modules for **materials**, **quizzes**, **flashcards**, **notebooks**, user authentication, and an integrated chatbot.

## 🚀 Features

### ✅ Authentication
- Login & Register pages  
- JWT-based authentication  
- Secure password hashing using **bcrypt**

### ✅ Learning Modules
- **Materials**: create, edit, manage, and view course materials  
- **Notebook**: personal notes with CRUD functionality  
- **Quiz**: create, manage, and take quizzes  
- **Flashcards**: spaced-repetition friendly interface
- **Dashboard**: user progress tracking with XP system

### ✅ Chatbot
- Custom chatbot UI (`LeleChatbot.tsx`)  
- Floating chat trigger button  
- Lele (catfish) farming specialized knowledge base

### ✅ UI/UX
- Responsive layout  
- Modern TailwindCSS-based design  
- Supports Markdown rendering, Math (`katex`), and GitHub-Flavored Markdown (GFM)
- Smooth animations and transitions

## 🧱 Tech Stack

### **Frontend**
- React 19 + TypeScript
- Vite
- TailwindCSS
- React Router v7
- React Query (TanStack Query)
- Framer Motion
- React Markdown + KaTeX
- Lucide Icons
- Axios

### **Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- TypeScript
- Bcrypt
- Nodemon (dev)

## 📁 Project Structure

```bash
leleku/
├── client/                     # Frontend React App
│   ├── src/
│   │   ├── _auth/              # Authentication pages
│   │   ├── _webapp/            # Main application
│   │   │   ├── layout/         # Layout components
│   │   │   ├── Materi/         # Materials module
│   │   │   ├── Notebook/       # Notebook module
│   │   │   ├── Quiz/           # Quiz module
│   │   │   └── Dashboard.tsx
│   │   ├── components/         # Reusable UI components
│   │   │   ├── LeleChatbot.tsx
│   │   │   ├── ProfileIcon.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── context/            # React contexts
│   │   ├── lib/                # Data fetching & config
│   │   └── types/              # TypeScript type definitions
│   └── vite.config.ts
│
└── server/                     # Backend Express API
    ├── prisma/
    │   └── schema.prisma       # Database schema
    ├── src/
    │   ├── config/             # Config files (DB connection, etc.)
    │   ├── controllers/        # API controllers
    │   ├── middlewares/        # JWT & custom middlewares
    │   ├── routes/             # API route definitions
    │   └── utils/              # Helper functions
    └── package.json
