

# 📚 EduFund: Decentralized Scholarship Platform

EduFund is a blockchain-powered decentralized application (DApp) designed to facilitate transparent and secure scholarship distribution. It allows students to submit requests for financial aid and enables sponsors to contribute directly to deserving students using smart contracts. 


## Prerequisites

Make sure you have the following installed on your computer:

1. **Node.js** – Needed to run the React frontend.
2. **Hardhat** – A tool for deploying and testing Ethereum smart contracts.
3. **MetaMask**  – A browser extension to manage your Ethereum accounts and interact with blockchain networks.
4. **Ethereum Test Network** –  A test network such as Holskey to simulate a blockchain environment and test your DApp without using real Ether (ETH).
---

### Step-by-Step Guide to Run the System

#### Step 1: Clone the Repository
Start by cloning the EduFund project repository to your computer.

1. **Clone the repository** by running this command in your terminal (or command prompt):
   ```bash
   git clone https://github.com/your-username/kba-project-main.git
   ```
2. Navigate to the project directory:
   ```bash
   cd kba-project-main
   ```

#### Step 2: Install Smart Contract Dependencies (Hardhat)
In this step, we’ll set up the smart contracts for EduFund.

1. Go to the **hardhat directory** where the blockchain code is located:
   ```bash
   cd hardhat
   ```

2. Install the necessary dependencies by running:
   ```bash
   npm install
   ```
   This command installs Hardhat and other necessary libraries for developing and interacting with Ethereum-based smart contracts.

#### Step 3: Compile Smart Contracts
Now that we have the necessary dependencies, we’ll compile the smart contracts. These contracts are written in Solidity and are responsible for the scholarship distribution process.

1. Run the following command to compile the smart contracts:
   ```bash
   npx hardhat compile
   ```
   This will generate the necessary files and make sure your smart contracts are ready to be deployed.

#### Step 4: Start Hardhat Network and Deploy Smart Contracts
At this point, we'll set up a local Ethereum network to deploy and test the smart contracts. 

1. Start the **local Hardhat network** (an Ethereum test network that runs on your computer):
   ```bash
   npx hardhat node
   ```
   The network will run at `http://localhost:8545`, which is where your smart contracts will be deployed.

2. Open a new terminal window and navigate to the **hardhat directory** again:
   ```bash
   cd hardhat
   ```

3. **Deploy the smart contracts** to the local network:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   After running this command, Hardhat will display the contract's address (a string of numbers and letters). **Copy this address**, as you will need it for the frontend (React) part of the platform.

#### Step 5: Configure the React Frontend
Now that the smart contracts are deployed, we need to connect the frontend (the user interface) to the blockchain.

1. Navigate to the **frontend directory**:
   ```bash
   cd frontend/donation
   ```

2. Install the React dependencies:
   ```bash
   npm install
   ```
   This installs the libraries required for running the frontend (React).

3. **Update the Smart Contract Address**:
   After deployment, open the file `frontend/src/config.js` in a text editor. Find the section where the contract address is stored and **paste the contract address** you copied earlier.

4. **Install ethers.js** (if it’s not already installed):
   `ethers.js` is a library that allows your React app to interact with the Ethereum blockchain.
   ```bash
   npm install ethers
   ```

#### Step 6: Run the React Development Server
Now it’s time to start the frontend.

1. Run the following command to start the React development server:
   ```bash
   npm run dev
   ```
   This will start the frontend at [http://localhost:3000](http://localhost:3000).

#### Step 7: Access the Application
You can now access the EduFund platform by opening your browser and going to:

[http://localhost:3000](http://localhost:3000)

Once you open this page, you should be able to interact with the platform. You can donate, register, and track scholarship transactions.

---

## 🎥 Demo Video
Watch the full demonstration of how to use the EduFund platform [here](https://youtu.be/1Hq5Li3Nfjs?si=vE1P5NCoiILs7tHa).

---
 
