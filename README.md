# 🚀 Nari – Mum-Friendly Job & Childcare Discovery Platform

## 📌 Project Overview

**Nari** is a full-stack web application designed to help working mothers discover family-friendly workplaces and nearby childcare services.

The platform centralizes information about workplace benefits and childcare options, allowing users to **search, compare, and plan commute routes using interactive maps**.

The project demonstrates **full-stack development, API integration, geospatial services, and cloud deployment** using modern web technologies.

Users can:

🔹 Discover family-friendly companies
🔹 Compare workplace benefits and ratings
🔹 Locate nearby childcare centers
🔹 Plan routes using interactive maps

---

# 🏗 Architecture Overview

<img width="1000" src="https://github.com/user-attachments/assets/08725558-8ab5-4062-ba2b-c28eb8e2d9e6" />

### Deployment

🔹 GitHub – Version control
🔹 Render – Cloud hosting
🔹 Environment variables – Secure token management

---

# 🧩 Core Features

## 1️⃣ Dynamic Company Directory

Companies are dynamically rendered using **Flask + Jinja2 server-side templating**.

Example template:

```
{% for company_name, com in companies.items() %}
```

Each company card dynamically displays:

🔹 Company name
🔹 Employee count
🔹 Company logo
🔹 Website link
🔹 Benefits offered
🔹 Workplace rating

Clicking a company card loads detailed company information dynamically using JavaScript.

---

## 2️⃣ Company Filtering & Comparison

Users can:

🔹 Filter companies by rating, benefits, and size
🔹 Compare multiple companies using an interactive comparison modal
🔹 Update results dynamically with JavaScript

This improves usability when evaluating potential employers.

---

## 3️⃣ Interactive Childcare Discovery

The platform integrates **Mapbox APIs** to help users locate nearby childcare services.

Technologies used:

🔹 Mapbox GL JS
🔹 Mapbox Geocoding API
🔹 Mapbox Directions API

Key features include:

🔹 Address search for start and destination
🔹 Driving, walking, and cycling routes
🔹 Real-time route visualization
🔹 Distance and travel duration calculation
🔹 Turn-by-turn directions
🔹 Automatic map zoom and route display

---

## 4️⃣ Childcare Center Layer Filtering

Custom vector layers allow users to filter different childcare providers.

Supported center types:

🔹 Academies
🔹 Childcare Centers
🔹 Early Learning Centers
🔹 Kindergartens
🔹 OSHC (Outside School Hours Care)
🔹 Preschools

Additional features:

🔹 Filter by **NQS Rating**
🔹 Interactive map popups displaying:

• Opening hours
• Services offered
• Address information

---

# 🛠 Technology Stack

## Backend

Python 3.11
Flask 3.0
Gunicorn
SQLite
Jinja2 Template Engine
python-dotenv

## Frontend

HTML5
CSS3
Bootstrap 5
Tailwind CSS
JavaScript (ES6)

## APIs

Mapbox GL JS
Mapbox Geocoding API
Mapbox Directions API

## Deployment

GitHub
Render Web Service
Gunicorn WSGI server

---

# 📂 Project Structure

<img width="700" src="https://github.com/user-attachments/assets/c44fd6b8-7925-45f6-ae94-da1a781c07ab" />

---

# 🔐 Security Implementation

🔹 Mapbox API tokens stored securely using environment variables
🔹 No sensitive credentials hardcoded in the repository
🔹 `.env` file excluded using `.gitignore`
🔹 Public Mapbox tokens (`pk.`) used only for client-side rendering

Example usage:

```
os.getenv("MAPBOX_ACCESS_TOKEN")
```

---

# ☁ Deployment

The application is deployed on **Render**.

### Production Setup

🔹 Render Web Service
🔹 Gunicorn WSGI server

Start command:

```
gunicorn main:app
```

Environment variables are configured through the Render dashboard.

---

# 🌍 Live Demo

🔗 Live Application
https://gendereq.onrender.com

🔗 GitHub Repository
https://github.com/mdfadhih/GenderEq

---

# 📸 Screenshots

## Company Listing Page

<img src="https://github.com/user-attachments/assets/bdc05570-127a-458b-8daf-3efebdc98f28" width="700"/>

## Company Comparison Modal

<img src="https://github.com/user-attachments/assets/0f463ce4-796a-4722-bbe1-e4f35a105313" width="700"/>

## Childcare Map

<img src="https://github.com/user-attachments/assets/21e31b40-05b6-47f5-a30f-48612b692482" width="700"/>

## Route Planning Interface

<img src="https://github.com/user-attachments/assets/824ff653-d819-49d5-8fc1-aed98e90e6fa" width="700"/>

---

# 🎯 What This Project Demonstrates

🔹 Full-stack web development
🔹 Server-side rendering using Jinja2
🔹 API integration and geospatial services
🔹 Cloud deployment and infrastructure
🔹 Secure environment configuration
🔹 Real-world problem solving
🔹 Interactive UI/UX design

---

# 🚀 Future Improvements

🔹 PostgreSQL production database
🔹 User authentication system
🔹 Save favourite companies
🔹 Advanced AJAX filtering
🔹 Performance optimisation
🔹 Custom Mapbox map styles

---

# 👨‍💻 Author

**Mohamed Fadhih**
Frontend & Cloud Engineer
Melbourne, VIC

LinkedIn
https://www.linkedin.com/in/fadhih/

GitHub
https://github.com/mdfadhih

Portfolio
https://my-portfolio-seven-tawny-79.vercel.app

---

# 📄 License

This project is developed for **portfolio and demonstration purposes**.
