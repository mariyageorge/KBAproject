// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ScholarshipPlatform {
    address public admin; // Admin who controls the contract

    // Sponsor structure to manage donations
    struct Sponsor {
        uint256 id;          // Sponsor ID
        address receiver;    // Receiver of the sponsor funds
        uint256 maxAmount;   // Maximum amount requested
        uint256 collected;   // Amount collected so far
        uint256 balance;     // Current balance available for withdrawal
        bool status;         // Status of the sponsor request (active/inactive)
    }

    mapping(uint256 => Sponsor) public sponsorRequests;      // Store sponsor requests by ID
    mapping(uint256 => Applicant[]) public sponsorApplicants;  // Store applicants by sponsor ID
    uint256 public sponsorCount;                             // Track the number of sponsor requests

    struct Applicant {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    event SponsorCreated(uint256 indexed sponsorId, address indexed receiver, uint256 maxAmount);
    event FundReceived(uint256 indexed sponsorId, address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 indexed sponsorId, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action.");
        _;
    }

    modifier onlyAdminOrReceiver(uint256 _sponsorId) {
        require(
            msg.sender == admin || msg.sender == sponsorRequests[_sponsorId].receiver,
            "Only the admin or the assigned receiver can perform this action."
        );
        _;
    }

    modifier onlyReceiver(uint256 _sponsorId) {
        require(msg.sender == sponsorRequests[_sponsorId].receiver, "Only the assigned receiver can perform this action.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Function to create a new sponsor request
    function CreateRequest(
        uint256 _sponsorId,
        address _receiver,
        uint256 _maxAmount
    ) public onlyAdmin {
        require(_receiver != address(0), "Receiver address cannot be zero.");
        require(_maxAmount > 0, "Maximum amount must be greater than zero.");
        require(sponsorRequests[_sponsorId].id == 0, "Sponsor ID already exists."); // Ensure unique sponsor ID

        // Increment the sponsor count
        sponsorCount++;

        // Create and store the sponsor
        sponsorRequests[_sponsorId] = Sponsor({
            id: _sponsorId,
            receiver: _receiver,
            maxAmount: _maxAmount,
            collected: 0,
            balance: 0,
            status: true
        });

        emit SponsorCreated(_sponsorId, _receiver, _maxAmount);
    }

    // Function to allow donations to a specific sponsor request
    function SponsorNow(uint256 _sponsorId, uint256 _amount) public payable {
        require(_sponsorId > 0 && sponsorRequests[_sponsorId].id != 0, "Invalid sponsor ID.");
        Sponsor storage sponsor = sponsorRequests[_sponsorId];
        require(sponsor.status, "Sponsor request is not active.");
        require(_amount > 0, "Transaction amount must be greater than zero.");
        require(sponsor.collected + _amount <= sponsor.maxAmount, "Transaction exceeds required amount.");

        sponsor.collected += _amount;
        sponsor.balance += _amount;

        // Log the donation
        sponsorApplicants[_sponsorId].push(Applicant({
            donor: msg.sender,
            amount: _amount,
            timestamp: block.timestamp
        }));

        emit FundReceived(_sponsorId, msg.sender, _amount);
    }

    // Function to allow the admin or receiver to withdraw funds from a specific sponsor request
    function withdraw(uint256 _sponsorId, uint256 _amount) public onlyReceiver(_sponsorId) payable {
        require(_sponsorId > 0 && sponsorRequests[_sponsorId].id != 0, "Invalid sponsor ID.");
        Sponsor storage sponsor = sponsorRequests[_sponsorId];
        require(_amount > 0, "Withdrawal amount must be greater than zero.");
        require(_amount <= sponsor.balance, "Insufficient balance.");

        sponsor.balance -= _amount;

        // Send funds to the sponsor's receiver
        (bool success, ) = sponsor.receiver.call{value: _amount}("");
        require(success, "Withdrawal failed.");

        emit FundsWithdrawn(_sponsorId, _amount);
    }

    // Function to check the contract balance for a specific sponsor (Admin or Receiver only)
    function getContractBalance(uint256 _sponsorId) public view onlyAdminOrReceiver(_sponsorId) returns (uint256) {
        require(_sponsorId > 0 && sponsorRequests[_sponsorId].id != 0, "Invalid sponsor ID.");
        return sponsorRequests[_sponsorId].balance;
    }

    // Function to get all donations for a specific sponsor (Admin only)
    function TransactionHistory(uint256 _sponsorId) public view onlyAdmin returns (Applicant[] memory) {
        require(_sponsorId > 0 && sponsorRequests[_sponsorId].id != 0, "Invalid sponsor ID.");
        return sponsorApplicants[_sponsorId];
    }
}
