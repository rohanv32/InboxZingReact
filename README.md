# 📬 Inbox Zing - Full-Stack Application

Welcome to **Inbox Zing!** 🎉 This React-based application is designed to bring you the latest news and updates from various media outlets, all in one place. Enjoy a sleek, intuitive interface with easy navigation options to set your preferences, customize your experience, and stay informed.

---

## 👥 Team Members

Rohan Sabu

Komal Neupane

Ali Tamer

Olivia Xiang

---

## 🚀 Features

- **🔒 Registration Page**: The entry point of the app provides options to **Sign Up** or **Login** to access your personalized news feed. Start by creating an account or logging into an existing one.

- **📰 News Feed**: Once logged in, you will be welcomed with a clean, card-based news feed with the latest articles. Each card contains:
  - Headline and source for quick identification.
  - A short snippet for a preview of the article.
  - Option to dismiss unwanted articles to keep your feed tidy.
  - The current design is just a mock-up before the final design by the end of the project.

- **🔄 Preferences Setup**:
  - **Media Outlets Selection**: Choose from a range of popular media outlets (e.g., **Axios**, **Bloomberg**, **Reuters**, etc.) to filter the sources for your news feed.
  - **Location and Language**: Tailor the content based on your **Country** and **Language** for a more localized news experience.
  - **News Delivery Preferences**: Select your preferred **news update frequency** (e.g., every 12 hours) and **summary style** (e.g., brief or in-depth) to stay up-to-date in a way that suits your schedule.

- **🗑️ Account Management**:
  - **Delete Account**: If you wish to unsubscribe from the service, the app allows you to delete your account permanently.

- **🌐 Responsive Design**: Built to look great on desktop, tablet, and mobile devices for a seamless experience across any device.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or later) & **npm** (Node Package Manager)
  - [Download Node.js](https://nodejs.org/)

---

## 🛠️ Installation & Setup

To set up Inbox Zing locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rohanv32/InboxZingFrontend.git

2. **Navigate to the Project Directory**:
   ```bash
   cd InboxZingFrontend

3. **Install Dependencies**:
   ```bash
   npm install
   
---

## ▶️ Running the Application

After the setup is complete, you’re ready to launch Inbox Zing!

1. **Start the Development Server**:
   ```bash
   npm start
   ```
   This will launch the app on `http://localhost:3000`. Open this link in your browser to start using Inbox Zing.

---

## 🖼 Key Pages [Features]

Here are some key pages in the Inbox Zing app:

### 1. Authentication Page
- **Sign Up** or **Login** to get started.

### 2. News Feed
- A curated feed with the latest articles from selected sources.
- **Dismiss** articles you’re not interested in.

### 3. Preferences Setup
- Choose media outlets, country, and language to personalize your experience.
- Set your **news delivery frequency** and **summary style**.

### 4. Account Deletion
- Easily delete your account if you no longer wish to use the service.

### 5. Podcast
- Podcast for hand-free news update

---

## 📚 Usage Guide

1. **Sign Up / Login**: Access the app by signing up for a new account or logging into an existing one.
2. **Customize Preferences**: Choose your preferred news sources, language, location, and frequency of updates.
3. **View and Manage Feed**: Stay updated with the latest news in a format and frequency that suit your preferences.
4. **Delete Account**: Remove your account anytime through the **Delete Account** page.

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS, JavaScript, HTML, CSS
- **Styling**: Styled-components / CSS Modules including SweetAlert2 for stylised alerts and Ant Design for Dark/Light Reading Mode
- **Backend**: Python, MongoDB, Pydantic, News API, Sendgrid API, OpenAI API

**Backend Guide**

  Please go to https://github.com/rohanv32/InboxZing and follow the set-up instructions there.

---

## 📌 Endpoints

| **Method** | **Endpoint**                    | **Description**                                                    |
|------------|---------------------------------|--------------------------------------------------------------------|
| GET        | `/status`                       | To retrieve user login status.                                     |
| POST       | `/signup`                       | To create a new user.                                              |
| POST       | `/verify_confirmation`          | To verify user by email.                                           |
| POST       | `/login`                        | To login user to send email updates.                               |
| PUT        | `/preferences/{username}`       | To modify user preferences.                                        |
| GET        | `/news/{username}`              | To fetch news articles according to user preferences.              |
| PATCH      | `/news/{username}/mark_as_read` | To mark news articles as read status.                              |
| GET        | `/news/{username}/statistics`   | To calculate user statistics.                                      |
| GET        | `/user/{username}`              | To get preferences for profile page display.                       |
| PUT        | `/user/{username}/password`     | To handle password update.                                         |
| GET        | `/news_articles/`               | To get all news articles stored in the database.                   |
| DELETE     | `/user/{username}`              | To delete user and their stored data from the database.            |
| GET        | `/podcast/{username}`           | To retrieve podcast for the user.                                  |
| GET        | `/audio/{file_id}`              | To get audio for the podcast.                                      |
| POST       | `/points/update`                | To update points earned by the user.                               |
| GET        | `/points/{username}`            | To fetch current points the user has.                              |
| GET        | `/news_sources`                 | To fetch and process news sources grouped by country and category. |
| GET        | `/streak/{username}`            | To get the user's reading streak statistic.                        |

---

## 📝 Design Decisions

- **React Components**: Each React component is modular and reusable, representing distinct UI parts (e.g., news card, preferences, authentication). This structure simplifies maintenance and scaling.
  
- **Card-Based News Feed**: A card layout enhances readability, allowing users to scan headlines and snippets quickly, with clear options for dismissing articles.

- **Responsive Design**: Built using CSS media queries and Grid layouts, the app provides a seamless experience across devices.

- **User-based Customization**: Customizable preferences (e.g., update frequency, language, sources) make the app flexible and tailored to individual needs, boosting engagement.

## ⚙️ Technical Choices 

- **React**: Selected for its component-based structure, efficient rendering, and rich ecosystem, ideal for dynamic and interactive UIs.
  
- **Styled-Components**: Used for component-based styling, preventing style conflicts and aiding large-scale styling management for large apps and extensive features.

- **JavaScript**: Chosen for its popularity and seamless integration with React, allowing for a clean codebase compatible with modern tools and features.
  
---

## 🥳 Wireframe

Refer to the Figma link below for a prototype of the application.
**Link to Figma**: https://www.figma.com/design/bobVvvYCEht8CUIDfDtgos/InboxZing?node-id=0-1&t=1iDVuQ9jCMgNMdjh-1

---

## ➕ Additional Features

- **On-demand podcast voice cloning**
- **Personalised news consumption experience for user**
- **Localised features for university students to build community traction**
- **Short-form news and gamification for user engagement**

---

## 🤖 AI Usage

- **Code Suggestions and Debugging**: Leveraged AI to generate code snippets, troubleshoot issues, and suggest improvements, especially in CSS and component rendering logic.
- **Documentation Assistance**: AI was used to streamline the creation of project documentation and provide a structured approach to the README and component documentation.

