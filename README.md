# Todeda
# React TypeScript Todo App with NestJS and Prisma

## Task Overview

This repository contains the code for a full-stack Todo application. The frontend is built with React and TypeScript, and the backend is implemented using NestJS with Prisma for PostgreSQL integration. The main tasks include user authentication, authorization, and CRUD operations for managing todo items.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - React Router
  - Axios for API requests
  - React Icons for iconography
  - Styles: CSS (styles are present in separate CSS files)

- **Backend:**
  - NestJS (Node.js framework)
  - Prisma (Database ORM)
  - PostgreSQL (Database)
  - JSON Web Tokens (JWT) for authentication
  - Bcrypt for password hashing
  - CORS for handling cross-origin resource sharing

## Backend APIs

- **Registration:**
  - Endpoint: `POST http://localhost:3000/auth/register`
  - Request body: `{ name: string, email: string, password: string }`
  - Response: `{ status: number, data: { user: User } }`

- **Login:**
  - Endpoint: `POST http://localhost:3000/auth/login`
  - Request body: `{ email: string, password: string }`
  - Response: `{ status: number, data: { token: string } }`

- **Get all users:**
  - Endpoint: `GET http://localhost:3000/users`
  - Response: `{ status: number, data: { users: User[] } }`

- **Get all todo items:**
  - Endpoint: `GET http://localhost:3000/todo`
  - Response: `{ status: number, data: { todos: Todo[] } }`

- **Get a specific todo item:**
  - Endpoint: `GET http://localhost:3000/todo/:id`
  - Response: `{ status: number, data: { todo: Todo } }`

- **Add a new todo item:**
  - Endpoint: `POST http://localhost:3000/todo`
  - Request body: `{ description: string, priority: string, date: string, completed: boolean }`
  - Response: `{ status: number, data: { todo: Todo } }`

- **Delete a todo item:**
  - Endpoint: `DELETE http://localhost:3000/todo/:id`
  - Response: `{ status: number, message: string }`

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app

  **Install dependencies:**

  # Frontend
  npm install
  
# Backend
cd backend
npm install

**Set up PostgreSQL database:**

Create a PostgreSQL database and update the connection details in the backend/prisma/schema.prisma file.

**Run database migrations:**
cd backend
npx prisma migrate dev

**Start the backend (NestJS):**
cd backend
npm run start:dev

**Start the frontend (React):**
npm start

**Access the application:**

Open your browser and go to http://localhost:3000


**Hadi Hayek  Todoapp**

