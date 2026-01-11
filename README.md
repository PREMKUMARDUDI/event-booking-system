# Event Booking System Backend

This is a backend implementation for an Event Booking System built with Node.js and Express. It supports role-based access control (Organizers & Customers), event management, ticket booking, and simulated background notifications.

## 🚀 Features

- **Authentication:** Secure Login/Register using JWT & Bcrypt.
- **Role-Based Access Control (RBAC):**
  - **Organizers:** Create and update events.
  - **Customers:** Browse events and book tickets.
- **Event Management:** CRUD operations for events.
- **Ticket Booking:** Validates ticket availability and prevents overbooking.
- **Background Tasks (Simulated):**
  - Sends a confirmation email (console log) when a ticket is booked.
  - Notifies all attendees (console log) when an event is updated.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Token (JWT)
- **Module System:** ES Modules (`import`/`export`)

---

## ⚙️ Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone <your-repo-link>
    cd event-booking-system
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/event_booking_db
    JWT_SECRET=your_super_secret_key_here
    ```

4.  **Run the Server**

    - **Development Mode** (Auto-restart with Nodemon):

      ```bash
      npm run dev
      ```

    - **Production Mode:**
      ```bash
      npm start
      ```

---

## 📡 API Endpoints

### 1. Authentication

| Method | Endpoint             | Description         | Body                                                                                   |
| :----- | :------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| `POST` | `/api/auth/register` | Register a new user | `{ "name": "John", "email": "john@test.com", "password": "123", "role": "Organizer" }` |
| `POST` | `/api/auth/login`    | Login user          | `{ "email": "john@test.com", "password": "123" }`                                      |

> **Note:** Role can be `"Organizer"` or `"Customer"`.

### 2. Events

| Method | Endpoint          | Access        | Description                                  |
| :----- | :---------------- | :------------ | :------------------------------------------- |
| `GET`  | `/api/events`     | Public        | Get all events                               |
| `POST` | `/api/events`     | **Organizer** | Create a new event                           |
| `PUT`  | `/api/events/:id` | **Organizer** | Update event details (Triggers Notification) |

### 3. Bookings

| Method | Endpoint            | Access       | Description                                 |
| :----- | :------------------ | :----------- | :------------------------------------------ |
| `POST` | `/api/bookings/:id` | **Customer** | Book a ticket for an event (Triggers Email) |

> **Important:** Protected routes require the header: `x-auth-token: <your_jwt_token>`

---

## 🧠 Design Decisions

### 1. Architecture: Modular & Simple

I chose a standard **MVC (Model-View-Controller)** folder structure.

- **Why?** It separates concerns logic (Controllers), database structure (Models), and routing (Routes). This makes the code readable and scalable while avoiding over-engineering for a small assignment.

### 2. Module System: ES Modules

I used `import/export` syntax (`"type": "module"` in `package.json`).

- **Why?** This is the modern standard for JavaScript development, aligning with frontend frameworks like React and providing cleaner syntax than `require()`.

### 3. Background Tasks: Native Node.js

Instead of using external message brokers like RabbitMQ or Redis (which require complex infrastructure setup), I simulated background tasks using `setTimeout` and asynchronous function calls.

- **Why?** The assignment required a simulation. This approach allows the API to respond immediately ("Ticket Booked") while the "Email Sending" logic runs asynchronously in the background without blocking the main thread.

### 4. Database: MongoDB

- **Why?** The schema flexibility of NoSQL is perfect for Event objects that might change structure. Mongoose was used for data validation to ensure data integrity (e.g., ensuring `availableTickets` is a number).

---

## 📂 Project Structure

```text
event-booking-system/
├── config/             # Database connection logic
├── controllers/        # Business logic for Auth, Events, and Bookings
├── middleware/         # Auth verification and Role checking
├── models/             # Mongoose Schemas (User, Event, Booking)
├── routes/             # API Route definitions
├── .env                # Environment variables
├── server.js           # App entry point
└── package.json        # Dependencies and Scripts
```
