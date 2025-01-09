
# 📚 EduFund: Decentralized Scholarship Platform

EduFund is a blockchain-powered decentralized application (DApp) designed to facilitate transparent and secure scholarship distribution. It allows students to submit requests for financial aid and enables sponsors to contribute directly to deserving students using smart contracts.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [MetaMask](https://metamask.io/) extension in your browser
- A supported Ethereum-compatible blockchain network (e.g., Ganache or any testnet)

---

## Steps to Run the EduFund DApp

### 1. Install Dependencies

1. Navigate to the `contracts` folder and run the following command to install all necessary dependencies:

   ```bash
   cd contracts
   npm install
   ```

2. Then, navigate to the `frontend/donation` folder and install its dependencies as well:

   ```bash
   cd frontend/donation
   npm install
   ```

---

### 2. Start the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

This command will compile and deploy the application locally.

---

### 3. Access the Application

Once the server is running, open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

---

### 4. Choose the Admin Account

1. Connect your MetaMask wallet to the application.
2. Switch to the account designated as the admin.
3. Navigate to the *Admin Dashboard*.
4. Create a new scholarship request by providing the necessary details.

---

### 5. Switch to the Sponsor Account

1. Log out of the admin account or switch accounts in MetaMask.
2. Connect your MetaMask wallet to a sponsor account.
3. Access the *Sponsor Dashboard*.
4. Review and contribute to available scholarship requests.

---

## 🚀 Features

- **MetaMask Wallet Integration**: Seamlessly connect to the Ethereum blockchain using MetaMask.
- **Scholarship Requests**: Applicants can submit requests with details such as the amount required and purpose.
- **Request Tracking**: View the status of submitted scholarship requests in real time.
- **Sponsor Contributions**: Sponsors can browse verified applications and directly contribute funds to a student's wallet address.
- **Transparency**: All transactions are stored on the blockchain for accountability and transparency.

---

## 🎥 Demo Video

Watch the full demonstration of the EduFund platform [here](https://youtu.be/1Hq5Li3Nfjs?si=vE1P5NCoiILs7tHa).

---

## 🛠 Tech Stack

### Frontend

- **HTML**: Structure of the web pages.
- **CSS**: Styling for modern and responsive design.
- **JavaScript**:
  - **Web3.js/Ethers.js**: Used to interact with the Ethereum blockchain. It allows seamless integration with MetaMask, facilitates smart contract interactions, and handles transactions.
  - **AJAX/Fetch**: Implements asynchronous data fetching to update request status and show live updates for sponsors and applicants.
  - **Event Handlers**: JavaScript manages user interactions, including submitting scholarship requests, displaying real-time transaction status, and handling contributions from sponsors.

### Blockchain Backend

- **Solidity**: Smart contract development for managing requests and contributions.
- **Ethereum**: Blockchain network for transaction management.
- **Hardhat**: Development and testing framework for Ethereum smart contracts.

---

## 📝 Smart Contract

### Functions

1. **Submit Request**: Allows applicants to submit details such as name, wallet address, amount needed, and purpose.
2. **Get Requests**: Retrieves scholarship applications for sponsors to review.
3. **Contribute**: Enables sponsors to send funds directly to the applicant's wallet.
4. **Update Status**: Updates the application status once the contribution is completed.

---

