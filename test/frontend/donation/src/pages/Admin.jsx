import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import getContract from "../utils/contract"; // Importing getContract
import { ethers, parseUnits } from "ethers"; // Import ethers and parseUnits

function Admin() {
  const navigate = useNavigate(); // Initialize navigate
  const [charityId, setCharityId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const createCharity = async () => {
    try {
      const contract = await getContract(); // Assuming this initializes and provides the contract instance

      // Check if ethers is properly initialized
      if (!ethers || !parseUnits) {
        throw new Error("ethers library is not properly set up.");
      }

      // Ensure createCharityRequest exists on the contract instance
      if (contract.createCharityRequest) {
        // Convert maxAmount to Wei using parseUnits
        const amountInWei = parseUnits(maxAmount, "ether");

        await contract.createCharityRequest(charityId, receiver, amountInWei);
        alert(" Request created successfully!");
      } else {
        throw new Error("Create Request method does not exist on contract.");
      }
    } catch (error) {
      alert("Error creating Request: " + error.message);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #E6E6FA, #D8BFD8)", // Gradient lavender background
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          textAlign: "center",
          width: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#4B0082",
          }}
        >
          Admin Panel
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter id here..."
            value={charityId}
            onChange={(e) => setCharityId(e.target.value)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              border: "1px solid #D8BFD8",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          />
          <input
            type="text"
            placeholder="Applicant Address"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              border: "1px solid #D8BFD8",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              border: "1px solid #D8BFD8",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={createCharity}
            style={{
              margin: "10px 0",
              padding: "10px 20px",
              backgroundColor: "#D8BFD8",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#4B0082",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              width: "80%",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#BA55D3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#D8BFD8")}
          >
            Create Request
          </button>
          <button
            onClick={() => navigate("/")} // Navigate to Home
            style={{
              margin: "10px 0",
              padding: "10px 20px",
              backgroundColor: "#D8BFD8",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#4B0082",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              width: "80%",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#BA55D3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#D8BFD8")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
