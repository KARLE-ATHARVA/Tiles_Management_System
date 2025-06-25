# Stile.it-Tiles Management System

A full-stack web application for managing tile product listings, built with **React.js**, **.NET Core (C#)**, **MySQL**, and deployed using **Render (backend)** and **Vercel (frontend)**.

## 🔧 Features

### 🔐 Authentication
- JWT-based secure login system
- Role-based access: `Admin` and `Viewer (Client)`
- Admin credentials managed manually (Viewer self-registers)

### 🧑‍💼 Admin Dashboard
- Add, update, delete, and block/unblock:
  - Products
  - Categories
  - Applications
- Image upload for products
- Flat card-style UI for easy management
- Activity logging for all critical operations

### 👤 Viewer Dashboard
- View only **unblocked** items
- Segregated pages for:
  - Products
  - Categories
  - Applications
- Clean and responsive UI

### 🌐 Deployment
- Backend deployed on **Render** using Docker
- Frontend hosted on **Vercel**
- Live APIs and fully functional frontend

---

## ⚙️ Tech Stack

| Frontend          | Backend         | Database | Deployment   |
|-------------------|-----------------|----------|--------------|
| React.js (with Tailwind CSS) | .NET Core 8 (C#) | MySQL      | Render (Docker), Vercel |
| React Router DOM  | Entity Framework Core |    |              |
| Axios             | JWT Auth        |          |              |

---

## 🚀 Live Demo

- **Check Out:** [https://tiles-management-system.vercel.app](https://tiles-management-system.vercel.app)

---

## 🔐 Credentials (Sample)

> ⚠️ **Admin is added manually in the database.** Viewer can register.
>
> 🔐 **Login to access Admin Dashboard**
> 
> **Username:** `Atharva`  
> **Password:** `272727`

---

## 🧠 Developer Notes

- Use `appsettings.json` for database config and JWT keys.
- Dockerized backend for smooth deployment on Render.
- All CORS policies configured for smooth communication between frontend and backend.

---
## 🙌 Acknowledgements

- [.NET Core](https://dotnet.microsoft.com/)
- [Render](https://render.com/) and [Vercel](https://vercel.com/)
- [Pomelo.EntityFrameworkCore.MySql](https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql)
- [React](https://reactjs.org/) & [Tailwind CSS](https://tailwindcss.com/) Communities

---

**Made with ✨ by Atharva Karle**  
[🌐 GitHub](https://github.com/KARLE-ATHARVA) • [🔗 LinkedIn](https://www.linkedin.com/in/atharva-karle-7a31a3345/)


