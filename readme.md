# Event Booking System API

This restFul API is designed for an event Booking system that can be used to manage users, events and bookings via role based access control for (Admin / User). It is robust and dockerized with all endpoints tested.

## 📁 Tech Stack Used

- Node JS
- Express JS
- PostgreSQL
- Sequelize JS
- JWT (Authentication System)
- Swagger (API Documentation)
- docker (Image + container)

---

## 📚 API Overview

### Authentication & Roles

- New users can signup via /user/signup
- When logging in the JWT tokens are issued in cookies
- Role based access control:
  - `user`: Allowed to book events and can view and delete their own bookings.
  - `admin`: Allowed to create, update, and delete events. They can also manage users and bookings

---

## 🔐 Middlewares

- **`isLoggedIn`**: This middleware checks for JWT token presence in cookies and validates it.
- **`isAdmin`**: Once logged in this middleware checks if the logged in user is Admin or not.
- **`authorizedUserOrAdmin`**: It allows access for resource owner or the admin (based on `userId` or `bookingId` in pram).

---

## 📌 API Endpoints

---

### 👤 User Endpoints

| Method | Endpoint       | Description                    | Access          |
|--------|----------------|--------------------------------|-----------------|
| POST   | `/user/signup` | Registers a new user           | Public          |
| POST   | `/user/login`  | Logs in and issues JWT cookie  | Public          |
| POST   | `/user/logout` | Logs out and clears the cookie | Logged in User  |
| GET    | `/user/`       | Get all users                  | Admin only      |
| GET    | `/user/:userId`| Get a user by ID               | Admin/AuthUser  |
| PUT    | `/user/:userId`| Update user info by ID         | Admin/AuthUser  |
| DELETE | `/user/:userId`| Delete user by ID              | Admin/AuthUser  |

---

### 🎫 Event Endpoints

| Method | Endpoint          | Description                | Access     |
|--------|-------------------|----------------------------|------------|
| POST   | `/event/`         | Create a new event         | Admin only |
| GET    | `/event/`         | Get all the events         | Public     |
| GET    | `/event/:eventId` | Get a specific event       | Public     |
| PUT    | `/event/:eventId` | Update event by ID         | Admin only |
| DELETE | `/event/:eventId` | Delete event by ID         | Admin only |

---

### 📑 Booking Endpoints

| Method | Endpoint                | Description                        | Access          |
|--------|-------------------------|------------------------------------|-----------------|
| POST   | `/booking/`             | Book an event                      | Logged-in User  |
| GET    | `/booking/my/:userId`   | Get bookings of a specific user    | Admin/AuthUser  |
| GET    | `/booking/`             | Get all the bookings               | Admin only      |
| GET    | `/booking/:bookingId`   | Get a booking by ID                | Admin/AuthUser  |
| PUT    | `/booking/:bookingId`   | Update booking by ID               | Admin only      |
| DELETE | `/booking/:bookingId`   | Delete booking by ID               | Logged-in User  |

---

## Environment Variables

Before running make sure to set up this .env file in your root project directory, consider the file '.env.sample' having all the feilds listed below:

```env
PORT=3000
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourDbPassword
JWT_SECRET_KEY=yourSecretKey
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
```

## 🔄 Workflow Overview

### User Workflow

1. Register an accound using `/user/signup`
2. Log in via `/user/login` → JWT token is issued in the cookies
3. Access your data `/user/:userId` (same route is used for update and delete via PUT and DELETE req)
4. Log out using `/user/logout`

### Admin Workflow

1. Log in as admin (In utils folder a script is there to generate an admin when server starts, you can login via)
```
email - admin@gmail.com
password - admin123
```
2. All CRUD operations allowed via `/event`
3. Can manage CRUD for users and events as well
4. Admin can delete users/events/bookings and all associated bookings will also be deleted automatically


## 🪑 Seat Management + Availability & Booking Flow

1. **Booking an Event:**
   - Logged in user can book a number of seats via `/booking`.
   - Then the system will check:
     - If the requested seats are available for the chosen event.
     - If the total available seats ≥ seats requested.
     - The seats can't be negative and handled dynamically for all CRUD operations related.
   - Updates `event.availableSeats` by subtracting the booked count.

2. **Updating a Booking:**
   - Checks for seat availability (Two cases the new event is either same/different).
   - If sufficient it adds back the previously booked event seats to the `event.availableSeats`.
   - Updates the seats for new event (if applicable) or re-calculates for same one.
   - Ensures total seats never go negative.

3. **Updating an Event:**
   - Checks for `event.totalSeats`
     - It calculates all booked seats.
     - Checks if the new total is not lesser than already booked ones.
     - Dynamically recalculates `availableSeats` for that event.

4. **Delete a Booking:**
   - Removes the booking and add back the booked seats to `event.availableSeats`.

5. **Delete a User or Event:**
   - Removes the user/event (admin only)
   - Also removes all related bookings via `booking.userId`.

---

## 📎 Notes

- Every sensitive routes are protected via middlewares with rol based control access.
- Swagger is used for documenting and testing APIs.
- All endpoints are tested successfully.

## 🚀 Installation

```bash
# 1. Clone the repo
git clone https://github.com/shivangshukla7020/EventBookingAPIs
cd EventBookingAPIs

# 2. Install dependencies
npm install

# 3. Configure environment (consider sample .env file)

# 4. Ensure postgres is installed along with PG Admin 4

# 5. Start the server
npm start
```
## http://localhost:3000/api-docs [Open this URL for reading api documentation once server is running]
