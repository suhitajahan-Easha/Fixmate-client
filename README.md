# FixMate – Smart Device & Home Appliance Repair Service Platform

## Project Overview

FixMate is a full-stack repair service platform that connects customers with professional technicians for smart device and home appliance repairs.

Customers can explore available repair services, submit repair requests, track booking progress, and make secure online payments after service completion. Technicians can manage their services and repair requests, while administrators manage users, approve services, and monitor platform activities.

## Live Website

- **Frontend:** https://fixmate-client-suhitajahan-easha.vercel.app
- **Backend API:** https://fixmate-server-swart.vercel.app

## Admin Credentials

Use the following credentials to access the Admin Dashboard:

- **Email:** `YOUR_ADMIN_EMAIL`
- **Password:** `YOUR_ADMIN_PASSWORD`

> Replace these placeholders with your actual seeded admin credentials before submitting the project. Do not publish real production passwords in a public repository.

## User Roles

### 1. Customer
- Register and log in securely.
- Browse approved repair services.
- Submit repair requests.
- View and manage repair bookings.
- Track booking status.
- Pay for completed services using Stripe.
- View payment history.
- Manage profile information.

### 2. Technician
- Register and access the Technician Dashboard.
- Add and manage repair services.
- Submit services for admin approval.
- View customer repair requests.
- Accept, update, and manage assigned bookings.
- Mark repair jobs as completed.
- View dashboard statistics.

### 3. Admin
- Access the Admin Dashboard.
- View platform statistics.
- Manage users and their roles.
- Review and approve or reject technician services.
- Monitor users and services.
- View recent platform activities.

## Key Features

- **Role-Based Authentication:** Separate dashboards and permissions for Customers, Technicians, and Admins using Better Auth and JWT.
- **Service Management:** Technicians can create and manage repair services, while admins control service approval.
- **Repair Booking System:** Customers can request repairs and track their booking status.
- **Booking Management:** Technicians can manage repair requests and update job progress.
- **Stripe Payment Integration:** Secure Stripe Checkout payments in test mode, available only after service completion.
- **Payment Verification:** Verify completed payments and prevent duplicate payment records.
- **Dashboard Statistics:** Reusable statistics cards for all three user roles.
- **Profile Management:** Users can manage their personal information.
- **Responsive Design:** User-friendly interface for desktop, tablet, and mobile devices.
- **Protected Routes:** Authentication and role-based authorization for dashboards and protected APIs.

## Technologies Used

### Frontend
- Next.js
- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- JSON Web Token (JWT)

### Payment Integration
- Stripe
- Stripe Checkout

### Other Tools & Services
- ImgBB – Image hosting
- Vercel – Frontend and backend deployment
- Git & GitHub – Version control

## Important NPM Packages

| Package | Purpose |
|---|---|
| `next` | React framework |
| `react` | Frontend UI development |
| `typescript` | Type safety |
| `tailwindcss` | Styling |
| `express` | Backend API development |
| `mongodb` | Database operations |
| `better-auth` | Authentication |
| `@better-auth/jwt` | JWT authentication plugin |
| `stripe` | Payment processing |
| `react-toastify` | Notifications |
| `lucide-react` | Icons |
| `jsonwebtoken` | JWT utilities, if used |
| `jose` | JWT verification |

*Note: Confirm the package names against your actual frontend and backend `package.json` files before submission. Remove any package you haven't installed or used.*

## Payment Process

FixMate follows a pay-after-service model:

1. Customer submits a repair request.
2. Technician accepts the booking.
3. Technician completes the repair.
4. Customer proceeds to Stripe Checkout.
5. Stripe processes the test payment.
6. The backend verifies the payment and updates the booking payment status.

**Payment Mode:** Stripe Test Mode

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd your-project-folder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` or `.env` file according to the frontend/backend project structure.

Add the required environment variables for MongoDB, Better Auth, JWT, Stripe, ImgBB, API URLs, and other services.

### 4. Run the Development Server

For the frontend:

```bash
npm run dev
```

For the backend:

```bash
npm run start
```

## Developer

**Suhita Jahan Easha**

- GitHub: https://github.com/suhitajahan-Easha
- LinkedIn: https://www.linkedin.com/in/suhita-jahan-easha/

---

**FixMate – Making Repair Services Easier, Faster, and More Reliable.**