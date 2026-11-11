# MERN JWT Authentication — Meridian UI

## Requirements
- Node.js and npm
- MongoDB running locally (or an Atlas connection string)

## 1. Backend
Open a terminal in the project folder:

```bash
cd backend
npm install
```

Create `backend/.env` using `.env.example` as a template:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_auth_exam
JWT_SECRET=replace_with_a_long_random_secret
```

Then run:

```bash
npm run dev
```

## 2. Frontend
Open a **second terminal** in the project folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Notes
- Keep the backend terminal running while using the frontend.
- The actual `.env` file is intentionally not included in this ZIP. Create it from `.env.example`.
- `node_modules` folders are excluded to keep the ZIP smaller. Run `npm install` in both folders.
