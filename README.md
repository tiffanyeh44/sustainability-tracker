# Sustainability Tracker

A full-stack web application for managing and tracking sustainability actions. This project uses a Django REST Framework backend and a React frontend, allowing users to perform CRUD operations on sustainability actions stored in a JSON file.

---

## Tech Stack

**Backend**

- Python 3.11+
- Django 5+
- Django REST Framework
- JSON file storage

**Frontend**

- React (Create React App)
- Axios
- Tailwind CSS

---

## Features

### Backend (Django REST Framework)

- `GET /api/actions/` — Retrieve all sustainability actions.
- `POST /api/actions/` — Add a new action.
- `PUT /api/actions/<id>/` — Fully update an action.
- `PATCH /api/actions/<id>/` — Partially update an action.
- `DELETE /api/actions/<id>/` — Delete an action.
- JSON-based storage (no database required).
- Input validation via DRF serializers.

### Frontend (React)

- Display actions in a table (ID, Action, Date, Points).
- Add new actions via Action Form with Add Action button.
- Edit and delete actions with Manage buttons.
- Real-time updates after actions.
- Responsive UI.

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js (v18+) & npm

---

## Clone the Repository

```bash
git clone https://github.com/tiffanyeh44/sustainability-tracker.git
cd sustainability-tracker
```

---

## Backend Setup (Django)

1. **Navigate to the backend folder:**

   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**

   **On macOS/Linux:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   **On Windows:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

4. **Start the server:**

   ```bash
   python manage.py runserver
   ```

   The API will be available at [http://localhost:8000/api/actions/](http://localhost:8000/api/actions/).

---

## Frontend Setup (React)

1. **Navigate to the frontend folder:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React app:**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Testing

- Use Postman or cURL to test API endpoints.
- The frontend UI will display error messages for failed requests.

---

## Project Structure

- [`backend/`](./backend) — Django REST API code
- [`frontend/`](./frontend) — React app code
