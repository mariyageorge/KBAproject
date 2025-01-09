const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CharityModule", (m) => {
  const charity = m.contract("CharityDonation"); // same contract name should be used

  return { charity };
});
