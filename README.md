# 🎬 Laravel + React Movie Streaming Starter Kit

A modern full-stack **Movie Streaming Website** starter kit built with **Laravel (backend)** and **React.js (frontend via Inertia.js)**. It includes an **Admin Dashboard with CMS features**, HLS video streaming, dark mode support, responsive UI, genre/language management, and more.

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
- PHP >= 8.2
- Composer
- Node.js + npm
- MySQL or SQLite
- FFmpeg installed on your server

### Steps


# 1. Clone the repo
```bash
git clone https://github.com/your-username/movie-streaming-starter.git
cd movie-streaming-starter
```

# 2. Install dependencies
composer install
```bash
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
