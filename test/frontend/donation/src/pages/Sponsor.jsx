import { useState } from "react";
import getContract from "../utils/contract";
import { parseUnits } from "ethers";
import { useNavigate } from "react-router-dom";

function Donation() {
  const [charityId, setCharityId] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const donateFunds = async () => {
    try {
      const contract = await getContract();

      const amountInWei = parseUnits(amount, "ether");
      console.log("Amount in Wei:", amountInWei.toString());

      await contract.donate(charityId, amountInWei);

      alert(" Transaction successful!");
    } catch (error) {
      console.error("Error in transaction of funds:", error);
      alert("Error in transaction of funds:" + error.message);
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
          width: "600px", // Increased the width of the container
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#4B0082", // Dark purple color
            marginBottom: "20px",
          }}
        >
          Sponsor Panel
        </h1>
        <div>
          {/* Charity ID Input */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Proper vertical alignment of label and input
              marginBottom: "15px",
            }}
          >
            <label
              htmlFor="charityId"
              style={{
                fontSize: "1.2rem", // Increased label size
                marginRight: "15px", // Space between label and input
                color: "#4B0082",
                width: "30%", // Align label width
                textAlign: "left", // Align label to the left
              }}
            >
           ID:
            </label>
            <input
              type="text"
              id="charityId"
              value={charityId}
              onChange={(e) => setCharityId(e.target.value)}
              style={{
                padding: "10px 20px",
                width: "65%", // Increased the width of the input box
                border: "2px solid #4B0082",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Amount Input */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Proper vertical alignment of label and input
              marginBottom: "15px",
            }}
          >
            <label
              htmlFor="amount"
              style={{
                fontSize: "1.2rem", // Increased label size
                marginRight: "15px", // Space between label and input
                color: "#4B0082",
                width: "30%", // Align label width
                textAlign: "left", // Align label to the left
              }}
            >
              Amount (ETH):
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: "10px 20px",
                width: "65%", // Increased the width of the input box
                border: "2px solid #4B0082",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Donate Button */}
          <button
            onClick={donateFunds}
            style={{
              marginTop: "20px",
              padding: "8px 15px", // Reduced the button size
              backgroundColor: "#D8BFD8",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#4B0082",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.3s ease, transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#BA55D3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#D8BFD8")}
          >
            Sponsor Now
          </button>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")} // Navigate to Home page
            style={{
              marginTop: "20px",
              padding: "8px 15px", // Reduced the button size
              backgroundColor: "#D8BFD8",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#4B0082",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.3s ease, transform 0.2s",
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

export default Donation;
