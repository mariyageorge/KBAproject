import { useNavigate } from 'react-router-dom';
import getContract from "../utils/contract";

const Home = () => {
  const navigate = useNavigate();

  const connectWalletAndNavigate = async (role) => {
    try {
      const contract = await getContract();
      const signerAddress = (await contract.signer.getAddress()).toLowerCase();
      console.log("Signer Address:", signerAddress);

      let isAuthorized = false;

      if (role === "admin") {
        const adminAddress = (await contract.admin()).toLowerCase();
        isAuthorized = signerAddress === adminAddress;
      } else if (role === "applicant") {
        const charityId = prompt("Enter Charity ID:");
        if (!charityId || isNaN(charityId) || parseInt(charityId) <= 0) {
          alert("Invalid Charity ID.");
          return;
        }

        const charity = await contract.charityRequests(charityId);
        const receiverAddress = charity.receiver.toLowerCase();
        console.log("Receiver Address:", receiverAddress);

        isAuthorized = signerAddress === receiverAddress;
      } else if (role === "sponsor") {
        isAuthorized = true;
      }

      if (isAuthorized) {
        navigate(`/${role}`);
      } else {
        alert(`Access Denied: You are not authorized as a ${role}.`);
      }
    } catch (error) {
      console.error(`Error verifying ${role} status:`, error);
      alert("Error connecting to MetaMask: " + error.message);
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
          width: "500px", // Increased width
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#4B0082",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          EDU-FUND
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#4B0082", // Changed description color to dark purple
            marginBottom: "20px",
          }}
        >
          <b>Empowering Dreams Through Seamless Education Funding</b>
        </p>
        <button
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
            transition: "background-color 0.3s ease, transform 0.2s",
            width: "100%",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#BA55D3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#D8BFD8")}
          onClick={() => connectWalletAndNavigate("admin")}
        >
          ADMIN PANEL
        </button>
        <button
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
            transition: "background-color 0.3s ease, transform 0.2s",
            width: "100%",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#BA55D3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#D8BFD8")}
          onClick={() => connectWalletAndNavigate("applicant")}
        >
          APPLICANT WITHDRAW
        </button>
        <button
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
            transition: "background-color 0.3s ease, transform 0.2s",
            width: "100%",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#BA55D3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#D8BFD8")}
          onClick={() => connectWalletAndNavigate("sponsor")}
        >
          SPONSOR
        </button>
      
      </div>
    </div>
  );
};

export default Home;
