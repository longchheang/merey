# 🎬 Laravel + React Movie Streaming Starter Kit

# 🧩 Laravel + React + Inertia.js: Full-Stack SPA Starter

A modern **Single Page Application (SPA)** stack using:

- 🔧 **Laravel** as the backend framework
- ⚛️ **React.js** as the frontend
- ⚡ **Inertia.js** to bridge Laravel and React
- 🎯 All in a unified full-stack development experience

---

## 🚀 Features

### 🎥 Movie Streaming
- Upload MP4 video, auto convert to **HLS format** using FFmpeg
- Play HLS with **HLS.js** player
- Custom video player UI (play/pause, resolution switch)

### 🧑‍💻 Tech Stack
- **Laravel** 11 (API & backend)
- **React.js** with **Inertia.js**
- **Tailwind CSS** for design
- **MySQL** or **SQLite** support
- **FFmpeg** integration for HLS conversion
- Admin authentication with **Laravel Breeze**

### 🛠️ Admin CMS
- Dashboard to manage:
  - 🎬 Movies
  - 📁 Genres
  - 🌐 Languages
- Movie CRUD (Create, Read, Update, Delete)
- Upload thumbnails and video files
- Secure video streaming

### 🌓 UI/UX
- Fully responsive layout
- Dark mode toggle
- Filters: genre, language, search

---


---

## ⚙️ Installation

### Requirements
- PHP >= 8.4
- Composer
- Node.js + npm
- MySQL
- FFmpeg installed on your server

### Steps


# 1. Clone the repo
```bash
git clone https://github.com/longchheang/merey.git
cd merey
```

# 2. Install dependencies
```bash
composer install
npm install
```

# 3. Create .env and set DB, etc.
```bash
cp .env.example .env
php artisan key:generate
```

# 4. Set up DB
```bash
php artisan migrate --seed
```

# 5. Compile assets
```bash
npm run dev  # or npm run build
```
# 6. Run the server
```bash
php artisan serve
```

# 🔐 user Access

Email : 
```bash
user@email.com
```
Password : 
```bash
user
```

# 🔐 Admin Access
Email :
```bash
admin@email.com
```
Password : 
```bash
admin
```
