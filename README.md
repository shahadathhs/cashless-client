# Mobile Financial Service (MFS) Application

This repository contains the code for a basic Mobile Financial Service (MFS) application developed using React.js, Node.js, Express.js, and MongoDB.

## Features

- **User Registration and Authentication:**
  - Users can register with Name, 5-digit PIN, Mobile Number, and Email. Registration requires admin approval.
  - JWT authentication is used for secure login.

- **Transaction Features:**
  - **Send Money:** Users can send money to other users. PIN verification and JWT are required.
  - **Cash-Out:** Users can cash out through agents, with a fee deducted from the transaction.
  - **Cash-In:** Users can cash in through agents without a fee.

- **Bonus and Fees:**
  - New users receive a one-time bonus of 40 Taka upon admin approval.
  - Fees are applied for transactions over 100 Taka and cash-out transactions.

- **Role-Based Access:**
  - **User:** Can perform transactions, check balance, and view transaction history.
  - **Agent:** Manages transactions, approves cash-in/cash-out requests, and checks balance.
  - **Admin:** Manages user accounts, activates/blocks accounts, and monitors system transactions.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shahadathhs/cashless-client.git
   cd cashless-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory of the project:

   ```
   VITE_API_URL=https://cashless-server.vercel.app
   ```

   Replace `https://cashless-server.vercel.app` with the URL of your backend server.

4. **Run the application:**

   ```bash
   npm run dev
   ```

   This command starts the development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- **User Dashboard:** Accessible after login, where users can perform transactions, check balances, and view transaction history.
- **Agent Dashboard:** Manage transactions, approve cash-in/cash-out requests, and view transaction history.
- **Admin Dashboard:** Manage user accounts, activate/block accounts, and monitor system transactions.
