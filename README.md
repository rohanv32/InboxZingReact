# Inbox Zing

Inbox Zing is a React-based frontend application that allows users to receive news articles tailored to their preferences based on country, category, and language. Users can create accounts, manage their preferences, and view articles with summaries in a preferred style.

## Features

### User Authentication: 

Supports user login, sign-up, and logout functionality.

### User Preferences: 

Users can navigate to the preferences section to update their settings.

### News Feed: 

An authenticated user can access a customized news feed.

### Account Management: 

Allows for account deletion and profile management.

### Conditional Rendering: 

Pages and components are conditionally displayed based on user authentication status.

## Technologies Used

### Frontend:

React, JavaScript

### Styles: 

CSS Modules / Tailwind CSS

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/rohanv32/InboxZingReact.git
cd InboxZingReact
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

This will start the application locally on http://localhost:3000.

## Components Documentation

### App.js

The main component managing routing, global state, and the rendering of all other components. It sets up the navigation logic based on activeTab and isLoggedIn status.

### Header.js

Displays navigation tabs based on the user's logged-in status, including Home, Sign Up, Login, Preferences, News Feed, Delete User, and Logout.

### Home.js

A welcome page for unauthenticated users, providing an overview and links to Login and Sign Up pages.

### Login.js

Handles user login. Contains a form that accepts credentials and authenticates users.

### SignUp.js

Manages the user sign-up process, allowing new users to create an account and navigate to Preferences upon successful registration.

### Preferences.js

Accessible to authenticated users to adjust settings.

### NewsFeed.js

Displays personalized content for authenticated users.

### DeleteUser.js

Allows authenticated users to delete their account.

## Development Process

### Design Decisions

Modular Component Structure: Each feature is encapsulated within its own component, which promotes reusability and simplifies maintenance.

Conditional Rendering Logic: Utilizes React’s conditional rendering to manage access to different parts of the application based on isLoggedIn and activeTab states.

Global State Management: Used Context API for global state, making it easier to manage user sessions across components.

### Technical Choices

React Router: Chose React Router for navigation and routing, allowing for dynamic, single-page navigation.

Context API: Opted for Context API to avoid prop drilling and maintain global state across the application (e.g., isLoggedIn status).

CSS Modules (if used): Modular CSS approach provides scope isolation, which prevents style collisions and enhances maintainability.

### AI Usage

Code Suggestions and Debugging: Leveraged AI for generating code snippets and troubleshooting issues during development, especially while considering CSS style implementation and conditional rendering of pages baesd on login states.

Documentation Assistance: AI was used to streamline the creation of project documentation and provide a structured approach to the README and component documentation.


