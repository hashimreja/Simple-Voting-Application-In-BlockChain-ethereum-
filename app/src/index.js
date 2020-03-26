import Web3 from "web3";
import  Voting_Artifact from "../../build/contracts/Voting.json";

let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting_Artifact.networks[networkId];
      this.voting = new web3.eth.Contract(
        Voting_Artifact.abi,
        deployedNetwork.address,
      );
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.loadCandidatesAndVotes();
      // this.voteForCandidateRama();
      // this.voteForCandidateNick();
      // this.voteForCandidateJose();

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

 loadCandidatesAndVotes : async function(){
   const {totalVotesFor} = this.voting.methods;
   let candidateNames = Object.keys(candidates);
  for(var i =0 ; i < candidateNames.length; i++){
    let name = candidateNames[i];
    var count = await totalVotesFor(this.web3.utils.asciiToHex(name)).call();
    console.log(count);
    $("#" + candidates[name]).html(count);
  }
 },
 voteForCandidateRama : async function (){
  const {voteForCandidate} = this.voting.methods;
  const vote  = await voteForCandidate(this.web3.utils.asciiToHex('Rama')).send({gas : 140000 , from : this.account})
  this.loadCandidatesAndVotes();
  $('#message').html('your vote has been recorded and reflect as soon as processed in blockchain')
},
 voteForCandidateNick : async function (){
  this.voting.methods.voteForCandidate(this.web3.utils.asciiToHex('Nick')).send({gas : 140000 , from : this.account})
  this.loadCandidatesAndVotes();
  $('#message').html('your vote has been recorded and reflect as soon as processed in blockchain')

},
voteForCandidateJose : async function (){
  this.voting.methods.voteForCandidate(this.web3.utils.asciiToHex('Jose')).send({gas : 140000 , from : this.account})
  this.loadCandidatesAndVotes();
  $('#message').html('your vote has been recorded and reflect as soon as processed in blockchain')

}
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
