# School Management SaaS (Monorepo)

A modern, high-performance School Management SaaS platform structured as a monorepo containing a Next.js frontend and a Laravel API backend.

---

## 📂 Project Structure

This project uses a simple monorepo structure with subfolders for the frontend and backend:

```text
School-Management-Sass/
├── api/                  # Laravel API (Backend)
└── web/                  # Next.js App Router (Frontend)
```

---

## 🚀 Getting Started

### 1. Frontend (`web/`)
The frontend is powered by **Next.js**, **TypeScript**, and **Tailwind CSS**.

* **Location:** `[web/](file:///c:/Users/Primex-Janrey/aaa/School-Management-Sass/web)`
* **Prerequisites:** Node.js (v18+ recommended) & npm

#### Setup & Installation
```bash
cd web
npm install
```

#### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### 2. Backend (`api/`)
The backend is powered by **Laravel 11+** and **PHP 8.4+**.

* **Location:** `[api/](file:///c:/Users/Primex-Janrey/aaa/School-Management-Sass/api)`
* **Prerequisites:** PHP 8.4+, Composer

#### Setup & Installation
```bash
cd api
composer install
```

#### Environment Setup
Copy the `.env.example` file to `.env` and generate the app key if not already generated:
```bash
cp .env.example .env
php artisan key:generate
```

#### Running Locally
```bash
php artisan serve
```
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to see the API root.

---

## 🛠️ Built With

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, ESLint
* **Backend:** Laravel Framework, PHP, Composer
