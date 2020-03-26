const Voting = artifacts.require('../contracts/voting.sol');

module.exports = function(deployer) {
  deployer.deploy(Voting,['Rama','Nick','Jose'].map(name => web3.utils.asciiToHex(name)));
};
