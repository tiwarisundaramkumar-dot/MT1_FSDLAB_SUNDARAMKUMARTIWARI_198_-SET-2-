# Student Record Management API — Set B

A REST API for managing student records using Node.js and Express.js.
All records are stored in an in-memory JavaScript array (no database).

## Requirements
- Node.js and npm
- Postman or Thunder Client

## Setup
Open a terminal in this project folder and run:

```bash
npm install
```

This creates `package-lock.json` automatically.

## Run
```bash
npm start
```

Server URL: `http://localhost:3000`

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Add a student |
| GET | `/api/students/:id` | Get a student by numeric ID |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/students/filter?branch=CSE` | Filter by branch |

## Sample POST / PUT JSON body
```json
{
  "rollNumber": "IT2404",
  "name": "Meera Gupta",
  "branch": "IT",
  "semester": 3,
  "email": "meera@example.com"
}
```

## Initial records
- 201 — CSE2401 — Aarav Sharma — CSE — Semester 3
- 202 — ECE2402 — Diya Verma — ECE — Semester 3
- 203 — CSE2403 — Kabir Singh — CSE — Semester 3

## HTTP status codes
- 200: Successful request
- 201: Student created
- 400: Invalid request data
- 404: Student not found

## Screenshots
Save your actual Postman/Thunder Client screenshots in the `screenshots` folder.
Do not use sample or edited screenshots as testing evidence.

## Important
The data is stored in memory. It resets whenever the server restarts.
Do not upload the `node_modules` folder to GitHub.
