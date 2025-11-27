# 🚀 Modern URL Shortener

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v22+-green.svg)
![React](https://img.shields.io/badge/react-v18+-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

A premium, full-stack URL shortener application built with modern web technologies. Features a glassmorphism UI, real-time analytics, and robust security measures.

🔗 **Live Demo:** [https://url-shortener-km4iiawv7-erdemabacis-projects.vercel.app/]

## ✨ Features

*   **🔗 URL Shortening**: Instantly generate short, shareable links.
*   **📊 Analytics**: Track click counts for every shortened URL.
*   **🎨 Modern UI**: Stunning interface with Glassmorphism effects, animated backgrounds (Framer Motion), and dark mode.
*   **🛡️ Security**:
    *   **Rate Limiting**: Protection against abuse (100 req/15min).
    *   **Helmet**: Secure HTTP headers.
    *   **Validation**: Automatic URL protocol correction.
*   **🐳 Dockerized**: Ready for containerized deployment.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 18 + Vite
*   **Styling**: Tailwind CSS + clsx + tailwind-merge
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose)
*   **Security**: Helmet, Express-Rate-Limit, CORS
*   **ID Generation**: NanoID

### DevOps
*   **Containerization**: Docker & Docker Compose
*   **Hosting**: Render (Backend) + Vercel (Frontend) + MongoDB Atlas

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   Docker (Optional)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ErdemAbaci/URLShortener.git
    cd URLShortener
    ```

2.  **Install Dependencies**
    ```bash
    # Backend
    npm install

    # Frontend
    cd client
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/url-shortener
    BASE_URL=http://localhost:5000
    ```

4.  **Run Locally**
    ```bash
    # Backend (Root terminal)
    npm run dev

    # Frontend (Client terminal)
    cd client
    npm run dev
    ```

### 🐳 Run with Docker

```bash
docker-compose up --build
```

## 📸 Screenshots

*(Add screenshots of your beautiful UI here)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
