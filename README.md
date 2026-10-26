# Vastu Vihar Nepal

## Project layout

- `frontend/` contains the Vite and React website.
- `backend/` contains the Express API and MongoDB connection.
- `backend/src/routes/enquiries.js` validates and stores website enquiries in the `enquiries` collection.

## Install

From this project directory, run:

```powershell
npm install
Copy-Item backend/.env.example backend/.env
```

Put your MongoDB Atlas connection string in `backend/.env`. Keep this file private; it is ignored by Git. In Atlas, create a database user and allow network access from the machine or hosting service where the backend runs.

## Local development

Open two terminals in the project directory:

```powershell
npm run dev:backend
```

```powershell
npm run dev:frontend
```

The Vite development server proxies `/api` requests to Express on port 5000. The enquiry form posts to `POST /api/enquiries`; the backend validates the fields and stores each submission in MongoDB.

## Production

Build the frontend and start the backend:

```powershell
npm run build
npm start
```

Express serves the built frontend and API from one origin. Its SPA fallback keeps React Router routes such as `/models`, `/contact`, and `/properties/1` working on direct visits and refreshes. Set `MONGODB_URI`, `MONGODB_DATABASE`, and `PORT` in the production host's environment settings.
