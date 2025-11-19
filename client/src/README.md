# 🏡 NeighborNest

> A hyper-local peer-to-peer sharing platform built with the MERN Stack.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://neighbour-nest-frontend-dzw0.onrender.com) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Live Demo
**[Click here to view the Live App](https://neighbour-nest-frontend-dzw0.onrender.com)**
*(Note: The free server may take 30 seconds to wake up on the first load.)*

---

## 📖 About
NeighborNest addresses the problem of underutilized household items. Instead of buying a power drill for 10 minutes of use, neighbors can lend and borrow items within a trusted "Community Code." 

This full-stack application handles user authentication, item management (CRUD), and a complete request/approval workflow for borrowing items.

## ✨ Key Features
- **🔐 Secure Authentication:** Custom JWT (JSON Web Token) authentication with protected routes.
- **🏘️ Community Isolation:** Users register with a specific "Community Code" and only see items from their own community.
- **📦 Item Management:** Users can post items/skills and delete items they own.
- **🔄 Borrowing Workflow:** - Non-owners can "Request to Borrow" items.
  - Owners can view, **Approve**, or **Reject** requests via a dedicated dashboard.
- **📱 Responsive UI:** Built with React and polished with professional toast notifications.

## 🛠️ Tech Stack

### Frontend
- **React.js:** Component-based UI architecture.
- **React Router:** Client-side routing for seamless navigation.
- **React Context API:** Global state management for User Authentication.
- **Axios:** HTTP client for API requests.
- **React Hot Toast:** Real-time notifications.

### Backend
- **Node.js & Express:** RESTful API architecture.
- **MongoDB & Mongoose:** NoSQL database for flexible data modeling.
- **JWT (JSON Web Tokens):** Stateless authentication mechanism.
- **Bcrypt.js:** Password hashing for security.
- **Cors:** Handling Cross-Origin Resource Sharing for production.

---

## 🔧 Local Setup & Installation

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string

### 1. Clone the Repository
```bash
git clone [https://github.com/ayushk107/neighbour-nest.git](https://github.com/ayushk107/neighbour-nest.git)
cd neighbour-nest

2. Backend Setup
Bash:
cd server
npm install

Create a .env file in the /server folder and add:

Code snippet:-
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
 
Start the server:

Bash:
npm run dev

3. Frontend Setup
Open a new terminal and go to the client folder:

Bash:
cd client
npm install
npm start

The app should now be running on http://localhost:3000.

Project Structure:

neighbour-nest/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components (ItemCard, ItemForm)
│   │   ├── context/     # AuthContext for global login state
│   │   ├── pages/       # Main views (Dashboard, Login, Requests)
│   │   └── App.js       # Main entry point with Routes
├── server/              # Node.js Backend
│   ├── controllers/     # Logic for Auth, Items, and Requests
│   ├── models/          # Mongoose Schemas (User, Item, Request)
│   ├── routes/          # API Endpoints
│   └── server.js        # Server entry point


👨‍💻 Author
Ayush 

Fullstack Developer Candidate

GitHub : https://github.com/ayushk107