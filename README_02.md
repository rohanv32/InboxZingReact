# 📬 Inbox Zing - Full-Stack Application

Welcome to **Inbox Zing!** 🎉 This React-based application is designed to bring you the latest news and updates from various media outlets, all in one convenient place. Enjoy a smooth, intuitive interface with easy navigation options to set your preferences, customize your experience, and stay informed. Plus, earn points and level up as you read!

---

## 👥 Team Members

Rohan Sabu

Komal Neupane

Ali Tamer

Olivia Xiang

---

## Why use InboxZing? What can we provide?

- Our primary aim is to help you as a user stay informed and engaged with the world by looking at news differently.

- The increasingly vast amount of news we have access to everyday can be a virtue and a vice, with all this information, we may feel overwhelmed and overloaded while trying to keep up with all of this in the midst of our daily schedules.

- As a whole, traditional means of news consumption, combined with the increasingly shorter attention spans we witness nowadays, can make consuming news a chore, as demonstrated by the popularity of news distribtution through social media, such as TikTok or Instagram. While this is a good way to capture the attention of a broader audience and is also personalised, the way these algorithms are set up can force us down a rabbit hole of opinions and ideas, which may or may not always be accurate.

- Most importantly, people are different, and they absorb new information in different ways. Some people tend to be auditory learners, others visual, and we all have different methods of retaining information important to us.

- InboxZing is built to address those problems, with the goal of making the experience as personalised as you would like as a user.

- With a simple, easy-to-understand interface, and news sourced directly from top media platforms, we provide you with the latest, accurate, news, and get you summrised version of the news you want, in the way you want. Be it Brief, Detailed, Humourous or Poetic, keep up with the world the way you want to.

- The points feature gives you a chance to not just gain knowlegde, but also a way to get appreciated for your efforts, and redeem interesting prizes when you hit milestones!

- By giving you your news as a podcast, we hope that this could just be another part of your daily routine that can be simplified and easily accessible, no matter how busy your day.

## 🖼 Key Features

- **🔒 Registration Page**: The entry point of the app provides options to **Sign Up** or **Login** to access your personalized news feed. Start by creating an account or logging into an existing one.

- **📰 News Feed**: Once logged in, you will be welcomed with a clean, card-based news feed with the latest articles. Each card contains:
  - Headline and source for quick identification.
  - A short snippet for a preview of the article.
  - Click on the article to learn more, and get a summarised version with the summary styles that you would prefer.
  - Earn points when you've completed reading your article, and redeem them for prizes(MYSK coffee!).

- **🔄 Preferences Setup**:
  - **Location and Language**: Tailor the content based on your **Country** and **Language** for a more localized news experience.
  - **Media Outlets Selection**: Choose from a range of popular media outlets (e.g., **Axios**, **Bloomberg**, **Reuters**, etc.) to filter the sources for your news feed.
  - **News Delivery Preferences**: Select your preferred **news update frequency** (e.g., every 12 hours) and **summary style** (e.g., brief or in-depth) to stay up-to-date in a way that suits your schedule.

- **🗑️ Account Management**:
  - **Delete Account**: If you wish to unsubscribe from the service, the app allows you to delete your account permanently.

- **Profile Page**
  - View your personal user preferences settings and statistics.

- **Account Deletion**
  - Easily delete your account if you no longer wish to use the service.

- **Podcast**
  - A Podcast feature, with your current news selection and summarised in your preferred style for hand-free news updates!

- **Emails**
  - Get your news feed sent directly to your inbox, as and when you prefer.

- **🌐 Responsive Design**: Built to look great on desktop, tablet, and mobile devices for a seamless experience across any device.

---

## 📋 Notes to the User

- The podcast feature is dependent on the OpenAI API calls, so if you encounter any usage issues, please contact us and we will get it working as soon as we can.


## 🛠️ Use our Application!

To use Inbox Zing, just click on the following link. Happy browsing!

[Link to the website](https://inboxzing-frontend-739742167446.us-central1.run.app/)

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS, JavaScript, HTML, CSS
- **Styling**: Styled-components / CSS Modules including SweetAlert2 for stylised alerts and Ant Design for Dark/Light Reading Mode
- **Backend**: Python, MongoDB, Pydantic, News API, Sendgrid API, OpenAI API

---

## 📌 Endpoints

| **Method** | **Endpoint**                    | **Description**                                                    |
|------------|---------------------------------|--------------------------------------------------------------------|
| POST       | `/signup`                       | To create a new user.                                              |
| POST       | `/verify_confirmation`          | To verify user by email.                                           |
| POST       | `/login`                        | To login user to send email updates.                               |
| PUT        | `/preferences/{username}`       | To modify user preferences.                                        |
| GET        | `/news/{username}`              | To fetch news articles according to user preferences.              |
| PATCH      | `/news/{username}/mark_as_read` | To mark news articles as read status.                              |
| GET        | `/news/{username}/statistics`   | To calculate user statistics.                                      |
| GET        | `/user/{username}`              | To get preferences for profile page display.                       |
| PUT        | `/user/{username}/password`     | To handle password update.                                         |
| DELETE     | `/user/{username}`              | To delete user and their stored data from the database.            |
| GET        | `/podcast/{username}`           | To retrieve podcast for the user.                                  |
| POST       | `/points/update`                | To update points earned by the user.                               |
| GET        | `/points/{username}`            | To fetch current points the user has.                              |
| GET        | `/news_sources`                 | To fetch and process news sources grouped by country and category. |
| GET        | `/streak/{username}`            | To get the user's reading streak statistic.                        |

---

## 🗃️ MongoDB Rationale

We chose **MongoDB** for this project due to the following reasons:
- **Schema Flexibility**: MongoDB allows for dynamic schemas, ideal for a news application where user preferences and articles can vary significantly.
- **Scalability**: It can handle large volumes of data efficiently, making it suitable for storing numerous articles fetched from various sources.
- **Performance**: MongoDB's document-oriented structure enables fast data retrieval, which is great for providing users with timely news updates.

Please take a look at InboxZingDatabase.pdf for the database architecture diagram.

---

## 📝 Design Decisions

- **React Components**: Each React component is modular and reusable, representing distinct UI parts (e.g., news card, preferences, authentication). This structure simplifies maintenance and scaling.
  
- **Card-Based News Feed**: A card layout enhances readability, allowing users to scan headlines and snippets, with clear options for dismissing articles.

- **Responsive Design**: Built using CSS media queries and Grid layouts, the app provides a seamless experience across devices.

- **User-based Customization**: Customizable preferences (e.g., update frequency, language, sources) make the app flexible and tailored to individual needs, boosting engagement.

## ⚙️ Technical Choices 

- **React**: Selected for its component-based structure, efficient rendering, and rich ecosystem, ideal for dynamic and interactive UIs.
  
- **Styled-Components**: Used for component-based styling, preventing style conflicts and aiding large-scale styling management for large apps and extensive features.

- **JavaScript**: Chosen for its popularity and seamless integration with React, allowing for a clean codebase compatible with modern tools and features.
  
---

## 🥳 Wireframe

Please refer to the Figma link below for a prototype of the application.
**Link to Figma**: https://www.figma.com/design/bobVvvYCEht8CUIDfDtgos/InboxZing?node-id=0-1&t=1iDVuQ9jCMgNMdjh-1

Refer to 'InboxZing Figma Wireframe and Data Flow Diagram.pdf' for the latest Figma wireframes and Data Flow Chart.

---

## ➕ Additional Features (For the Future of Our Application)

- **On-demand podcast voice cloning**
- **Personalised news consumption experience for user**
- **Localised features for university students to build community traction**
- **Short-form news and gamification for user engagement**

---

## 🤖 AI Usage

- **Code Suggestions and Debugging**: Leveraged AI to generate code snippets, troubleshoot issues, and suggest improvements, especially in CSS and component rendering logic.
- **Documentation Assistance**: AI was used to streamline the creation of project documentation and provide a structured approach to the README and component documentation.

---

## 📄 License
This project is licensed under the MIT license.
