# React Blog App with Appwrite

A full-featured blogging platform built with React, Redux Toolkit, Vite, and Appwrite. This project allows users to register, log in, create, edit, and delete blog posts with rich text and image uploads.

---

## 🚀 Features

- User authentication (sign up, login, logout) with Appwrite
- Create, edit, and delete blog posts
- Rich text editor for post content
- Upload and manage featured images for posts
- Responsive UI with Tailwind CSS
- State management with Redux Toolkit
- Form handling and validation with React Hook Form
- Protected routes for authenticated users
- Clean and modular code structure

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **State Management:** Redux Toolkit, React Redux
- **Backend as a Service:** Appwrite
- **Forms:** React Hook Form
- **Rich Text Editor:** TinyMCE React
- **Routing:** React Router DOM

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adityaroy000/React-BlogApp-With-Appwrite.git
   cd React-BlogApp-With-Appwrite/BlogApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🗂️ Project Structure

```
BlogApp/
├── src/
│   ├── appwrite/         # Appwrite service logic (auth, database, storage)
│   ├── assets/           # Static assets
│   ├── components/       # Reusable React components (forms, layout, etc.)
│   ├── conf/             # Appwrite config loader
│   ├── store/            # Redux slices and store setup
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json
└── README.md
```

---

## 🧩 Key Components

- **Authentication:**  
  Handles user registration, login, logout, and session management using Appwrite.

- **Post Management:**  
  Create, update, delete, and fetch blog posts. Each post can have a featured image and rich text content.

- **Redux Store:**  
  Manages authentication state and (optionally) post state for global access.

- **Forms:**  
  Uses React Hook Form for easy form state and validation.

- **UI Components:**  
  Includes reusable components like `Input`, `Button`, `Select`, `RTE` (Rich Text Editor), `PostCard`, `Header`, `Footer`, etc.

---

## 📝 Usage

- **Sign Up / Login:**  
  Register a new account or log in with existing credentials.

- **Create Post:**  
  Use the post form to add a new blog post with a title, content, and optional featured image.

- **Edit/Delete Post:**  
  Edit or delete your own posts from the dashboard.

- **Rich Text:**  
  Use the built-in editor to format your post content.

---

## 🛡️ Security

- All sensitive operations (create, edit, delete) are protected and require authentication.
- Appwrite handles user sessions and permissions.

---

## 📚 Customization

- Update Tailwind CSS classes for your own design.
- Extend Redux slices for more state management (e.g., post lists, comments).
- Add more Appwrite collections for features like comments, likes, etc.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

