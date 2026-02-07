# FUTURE_FS_03 – AI Café Website

Full Stack Web Development Internship Project  
Track Code: FS  
Task 03 – Local Business Website  

## Overview
This project is a full stack café website developed as part of the Future Interns Full Stack Web Development track.  
It simulates a real-world website for a local café, allowing users to browse menu items, interact with an AI assistant for food suggestions, and make table reservations.

The application is built with a React frontend and a Node.js/Express backend, connected to a MongoDB database and integrated with an AI service for menu-based recommendations.

## Features
- Dynamic menu display with categories
- AI assistant for food recommendations
- Reservation form with backend storage
- REST API integration between frontend and backend
- Modular component-based frontend architecture
- Scalable backend structure using controllers and routes

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose

Other:
- OpenAI API for AI assistant functionality

## Project Structure

Root folder contains two main applications:

client/  
React frontend built with Vite and Tailwind CSS.  
Contains components, pages, services, and hooks.

server/  
Node.js and Express backend.  
Includes configuration files, controllers, models, routes, middleware, and utilities.

## Installation and Setup

Clone the repository:
git clone https://github.com/Surajkumavat437/FUTURE_FS_03 
cd FUTURE_FS_03  

Install frontend:
cd client  
npm install  
npm run dev  

Install backend:
cd server  
npm install  
npm run dev  

The frontend will run on a Vite development server and the backend will run on the configured Node.js port.

## Environment Variables

Create a `.env` file inside the server folder and add the following:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
OPENAI_API_KEY=your_api_key  

The `.env` file is excluded from version control using `.gitignore`.

## Purpose
This project was built to demonstrate full stack development skills in a realistic business scenario, including API design, frontend integration, database usage, and basic AI integration. It is submitted as part of the Future Interns internship requirements and is publicly available for review and verification.

## Author
Suraj  
Full Stack Web Development Intern  
Future Interns
