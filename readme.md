# Event Booking System API

A RESTful API for managing users, events, and bookings built using Node.js, Express.js, Sequelize, and PostgreSQL. This API supports secure user authentication, event creation, and booking with role-based access control for (admin || user).

## 📁 Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- JWT (Authentication)
- Swagger (API Documentation)

---

## 📚 API Overview

### Authentication & Roles

- Users can sign up and log in.
- JWT tokens are issued upon login and stored in HTTP-only cookies.
- Two roles:
  - `user`: Can book events and can view and delete their own bookings.
  - `admin`: Can create, update, and delete events. Can also manage all bookings and users.

---

## 🔐 Middleware

- **`isLoggedIn`**: Verifies the presence and validity of JWT in cookies.
- **`isAdmin`**: Grants access to admin-only routes.
- **`authorizeUserOrAdmin`**: Allows access if the logged-in user is an admin or the owner of the resource (based on `userId` or `bookingId`).

---

## 📌 Endpoints

---

### 👤 User Endpoints

| Method | Endpoint       | Description                    | Access          |
|--------|----------------|--------------------------------|-----------------|
| POST   | `/user/signup` | Register a new user            | Public          |
| POST   | `/user/login`  | Log in and receive JWT cookie  | Public          |
| POST   | `/user/logout` | Log out and clear cookie       | Logged-in User  |
| GET    | `/user/`       | Get all users                  | Admin only      |
| GET    | `/user/:userId`| Get a user by ID               | Admin/AuthUser  |
| PUT    | `/user/:userId`| Update user info by ID         | Admin/AuthUser  |
| DELETE | `/user/:userId`| Delete user by ID              | Admin/AuthUser  |

---

### 🎫 Event Endpoints

| Method | Endpoint          | Description                | Access     |
|--------|-------------------|----------------------------|------------|
| POST   | `/event/`         | Create a new event         | Admin only |
| GET    | `/events/`        | Get all events             | Public     |
| GET    | `/event/:eventId` | Get a specific event       | Public     |
| PUT    | `/event/:eventId` | Update an event by ID      | Admin only |
| DELETE | `/event/:eventId` | Delete an event by ID      | Admin only |

---

### 📑 Booking Endpoints

| Method | Endpoint                | Description                        | Access          |
|--------|-------------------------|------------------------------------|-----------------|
| POST   | `/booking/`             | Book an event                      | Logged-in User  |
| GET    | `/booking/my/:userId`   | Get bookings of a specific user    | Admin/AuthUser  |
| GET    | `/booking/`             | Get all bookings                   | Admin only      |
| GET    | `/booking/:bookingId`   | Get a booking by ID                | Admin/AuthUser  |
| PUT    | `/booking/:bookingId`   | Update a booking by ID             | Admin only      |
| DELETE | `/booking/:bookingId`   | Delete a booking by ID             | Logged-in User  |

---

## 🔄 Workflow Overview

### User Workflow

1. Signup using `/users/signup`
2. Login using `/users/login` → JWT cookie issued
3. Access profile using `/users/:userId` or update/delete
4. Logout with `/users/logout`

### Admin Workflow

1. Login as admin
2. Create/update/delete events via `/events`
3. View or manage all users and bookings


## 🪑 Seat Management & Booking Flow

1. **Booking an Event:**
   - A user books a number of seats via `/bookings`.
   - The system checks:
     - If requested seats are available.
     - If total available seats ≥ seats requested.
     - That seats cannot be negative or overbooked.
   - Updates `event.availableSeats` by subtracting the booked count.

2. **Updating a Booking:**
   - Adds previously booked seats back to availability.
   - Re-checks new seat count against `event.availableSeats`.
   - Applies new booking if seats are valid.
   - Ensures total seats never go negative.

3. **Updating an Event:**
   - When updating `totalSeats`:
     - Calculates already booked seats.
     - Ensures new total is not less than already booked seats.
     - Dynamically recalculates `availableSeats`.

4. **Deleting a Booking:**
   - Cancels booking and re-adds booked seats to `event.availableSeats`.

5. **Deleting a User or Event:**
   - Automatically removes all related bookings.
   - Prevents orphan records and preserves data integrity.

---

## ✅ Working Flow Summary

```text
1. Logged-in user books an event using `/bookings`
2. User can view their bookings via `/bookings/my/:userId`
3. Admin can manage all bookings
4. Users can manage their own bookings
5. Number of seats are handled and calculated:
   - No overbooking
   - No negative availability
   - Safe recalculation of seats during update/delete
   - Booking logic dynamically manages seats

---

## 📎 Notes

- All sensitive routes are protected by middleware for authentication and authorization.
- Swagger is used for documenting and testing APIs.
- All endpoints are tested

## http://localhost:3000/api-docs [Open this URL for reading api documentation]
