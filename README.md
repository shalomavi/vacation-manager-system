# TravelFactory Vacation Manager


---

## Prerequisites

Before running the project locally, make sure you have installed:

* **Node.js** (v22+ recommended)
* **npm** or **yarn**
* **PostgreSQL** (v16+)
* **Git**

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shalomavi/vacation-manager-system.git
cd vacation-manager-system
```

---

### 2. Setup PostgreSQL Database

setup postgresql database and create a database named `vacation_db`
use  your username and password credentials

Update your backend `.env` file with database credentials:

```
DATABASE_URL=postgres://travelfactory:travelfactory@127.0.0.1:5432/vacation_manager
DB_HOST=127.0.0.1
DB_USER=your_username
DB_PASS=your_password
DB_NAME=vacation_db
PORT=3000
NODE_ENV=development
```
Insert the .env file in backend/src/db
and insert it in backend/
---

### 3. Install Backend Dependencies

run the following commands:

```bash
cd backend
npm install
npm run migrate
```


---

### 4. Start the Backend Server

```bash
npm run dev
```

By default, the backend server should run on `http://localhost:3000`.

---

### 5. Setup Frontend (Vue)

In another terminal, run:
```bash
cd frontend
npm install
```

---

### 6. Start the Frontend Server

```bash
npm run dev
```

By default, Vue will run on `http://localhost:5173`.

---

### 7. Access the Application

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:3000/api`

---

### 8. Running Tests

```bash
cd backend
npm run test
```

```bash
cd frontend
npm run test:unit
```

## Notes

* Make sure both backend and frontend are running simultaneously.
* If you encounter database connection errors, double-check your `.env` configuration and PostgreSQL service status.

