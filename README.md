# Task Manager Project

This project is a Trello-like task management application designed to showcase my full‑stack development and DevOps skills. It demonstrates my ability to build a modern, scalable application using containerization, CI/CD pipelines, cloud hosting, flexible NoSQL databases, and secure authentication.

## Overview

The Task Manager application allows users to create, update, and organize tasks using a board interface similar to Trello. Users can create boards, lists, and cards to manage their tasks efficiently. The project is built with a focus on modern development practices and cloud deployment strategies.

### Key Features

- **Board & Task Management:**  
  Create, update, and delete boards, lists, and task cards.
- **Responsive UI:**  
  A dynamic, responsive user interface built with Next.js and React.
- **User Authentication:**  
  Secure sign-up and sign-in powered by AWS Cognito.
- **Flexible Data Storage:**  
  Data is stored in MongoDB Atlas (leveraging a free tier) for a scalable NoSQL solution.
- **Containerized Deployment:**  
  Backend services are containerized with Docker and deployed on Amazon ECS (using EC2 instances).
- **CI/CD Automation:**  
  Continuous integration and deployment are managed via GitHub Actions.
- **Cloud Hosting:**  
  The front end is hosted on AWS Amplify, which provides a streamlined CI/CD experience.

## Tech Stack

- **Frontend:**  
  - [Next.js](https://nextjs.org/) & React  
  - Tailwind CSS (or another CSS framework of your choice)  
  - AWS Amplify for hosting and CI/CD

- **Backend:**  
  - Node.js (Express or Next.js API Routes)  
  - Docker for containerization  
  - Deployed on Amazon ECS using EC2 instances  
  - CI/CD via GitHub Actions

- **Database:**  
  - MongoDB Atlas (Free Tier available) for NoSQL data storage

- **Authentication:**  
  - AWS Cognito for secure user authentication (Free Tier available)

- **DevOps & CI/CD:**  
  - Docker for containerization  
  - GitHub Actions for build, test, and deployment automation  
  - Amazon ECS (EC2) for hosting backend services

## Project Structure

```plaintext
task-manager/
├── frontend/            # Next.js project for the UI
│   ├── pages/           # React pages and API routes
│   ├── components/      # Reusable UI components
│   ├── styles/          # Global and component-specific styles
│   └── package.json
├── backend/             # Node.js backend (if separated from Next.js API routes)
│   ├── src/             # Source code for the backend
│   ├── Dockerfile       # Docker configuration for containerizing the backend
│   ├── package.json
│   └── ...              # Other backend files
├── docker-compose.yml   # (Optional) For local multi-container setup
├── README.md            # This file
└── .github/             # GitHub Actions workflows for CI/CD
    └── workflows/
        └── ci-cd.yml

```
Run docker server using this
```
docker-compose up --build
```
