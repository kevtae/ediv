var MonthlyContract = artifacts.require("./MonthlyContract.sol");

module.exports = function (deployer) {
  deployer.deploy(MonthlyContract, 600, 10)
};
