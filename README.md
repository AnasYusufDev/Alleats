# Alleats

A food delivery app I'm building from scratch — users can browse nearby restaurants and place orders from their phone.

Still in active development. The goal is to get a solid MVP out and iterate from there.

---

## Stack

**Frontend** — React Native (Expo) + TypeScript, using Expo Router for navigation.

**Backend** — Spring Boot (Java), exposing a REST API.

---

## Project Structure

```
app/
├── frontend/    # React Native mobile app
└── backend/     # Spring Boot API
```

---

## Running locally

### Frontend

```bash
cd frontend
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go on your phone.

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

API runs on `http://localhost:8080`.

---

## Environment

Create a `.env` in the frontend folder:

```
API_URL=http://localhost:8080
```

---

## Status

MVP in progress. Core ordering flow is the current focus.

---

Built by [Anas Yusuf](https://github.com/AnasYusufDev)
