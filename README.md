🚀 Nari – Mum-Friendly Job & Childcare Discovery Platform
📌 Project Overview

Nari is a full-stack web application designed to support working mothers by helping them:

🔹Discover family-friendly workplaces

🔹Compare company benefits and ratings

🔹Locate nearby childcare centers

🔹Plan commute routes using interactive maps

This project demonstrates full-stack engineering, API integration, server-side rendering, and cloud deployment using modern web technologies.

🏗 Architecture Overview
<img width="2880" height="1620" alt="archi" src="https://github.com/user-attachments/assets/ee31e892-2b93-43b5-a795-d6aa77602265" />


Deployment:

🔹GitHub (Version Control)

🔹Render (Cloud Hosting)

🔹Environment Variables (Secure token management)

🧩 Core Features
1️⃣ Dynamic Company Listing (Server-Side Rendering)

Companies are dynamically rendered using Flask + Jinja2 templating.

Example:

{% for company_name, com in companies.items() %}

The system injects:

🔹Company name

🔹Employee count

🔹Logo

🔹Website

🔹Benefits

🔹Ratings

Clicking a company card triggers JavaScript to display detailed company information dynamically.

2️⃣ Company Filtering & Comparison

🔹Filter companies by rating, benefits, and size

🔹Compare companies via interactive modal

🔹Dynamic UI updates using JavaScript

3️⃣ Interactive Childcare Discovery (Mapbox Integration)

🔹Implemented using:

🔹Mapbox GL JS

🔹Mapbox Geocoding API

🔹Mapbox Directions API

Features:

🔹Start & destination address search

🔹Driving / Walking / Cycling route options

🔹Automatic route visualization

🔹Distance and duration display

🔹Turn-by-turn instructions

🔹Dynamic map zoom

4️⃣ Childcare Center Layer Filtering

🔹Integrated custom vector layers:

🔹Academy

🔹Childcare Centers

🔹Early Learning Centers

🔹Kindergartens

🔹OSHC

🔹Preschools

Features:

🔹Toggle center types

🔹Filter by NQS Rating

Interactive popups showing:

🔹Opening hours

🔹Services offered

🔹Address details

🛠 Technology Stack
🔹Backend

🔹Python 3.11

🔹Flask 3.0

🔹Gunicorn

🔹SQLite

🔹Jinja2 Template Engine

🔹python-dotenv

Frontend

🔹HTML5

🔹CSS3

🔹Bootstrap 5

🔹Tailwind CSS

JavaScript (ES6)

🔹APIs

🔹Mapbox GL JS

🔹Mapbox Geocoding API

🔹Mapbox Directions API

Deployment

🔹GitHub

🔹Render Web Service

🔹Gunicorn WSGI server

📂 Project Structure
<img width="2880" height="1620" alt="prostr" src="https://github.com/user-attachments/assets/260ab62e-343e-4217-9051-3c0bf32b02de" />


🔐 Security Implementation

🔹Mapbox API token stored securely using environment variables

🔹No sensitive credentials hardcoded

🔹.env file excluded via .gitignore

🔹Public Mapbox token (pk.) used for client-side rendering only

Example usage in Flask:

os.getenv("MAPBOX_ACCESS_TOKEN")
☁ Deployment

The application is deployed on Render.

Production setup:

🔹Web Service

🔹Gunicorn start command:

gunicorn main:app

Environment variables configured via Render dashboard

🌍 Live Demo

🔗 Live Application: https://gendereq.onrender.com
🔗 GitHub Repository: https://github.com/mdfadhih/GenderEq

📸 Screenshots

🔹Company Listing Page
<img width="2880" height="1620" alt="comlist" src="https://github.com/user-attachments/assets/ffa1a455-3f1f-48ef-9e00-404bdbf6f4c1" />


🔹Comparison Modal
<img width="2880" height="1327" alt="comcare" src="https://github.com/user-attachments/assets/0f463ce4-796a-4722-bbe1-e4f35a105313" />


🔹Childcare Map
<img width="2845" height="1319" alt="care" src="https://github.com/user-attachments/assets/21e31b40-05b6-47f5-a30f-48612b692482" />


🔹Route Planning Interface
<img width="2851" height="1328" alt="route" src="https://github.com/user-attachments/assets/824ff653-d819-49d5-8fc1-aed98e90e6fa" />


🎯 What This Project Demonstrates

🔹Full-stack web development

🔹Server-side rendering with Jinja2

🔹API integration and geospatial functionality

🔹Cloud deployment

🔹Secure environment configuration

🔹Real-world problem solving

🔹Interactive UI/UX design

🚀 Future Improvements

🔹PostgreSQL production database

🔹User authentication system

🔹Save favourite companies

🔹Advanced AJAX filtering

🔹Performance optimisation

🔹Custom Mapbox styles

👨‍💻 Author

Mohamed Fadhih
Frontend & Cloud Engineer
Melbourne, VIC

LinkedIn: https://www.linkedin.com/in/fadhih/
GitHub: https://github.com/mdfadhih/GenderEq
Portfolio: (Add link)

📄 License

This project is developed for portfolio and demonstration purposes.
