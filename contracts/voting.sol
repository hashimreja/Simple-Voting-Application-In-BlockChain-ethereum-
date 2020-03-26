pragma solidity >=0.4.21 <0.7.0;

contract Voting {
    bytes32[] public candidateList;
    mapping (bytes32 => uint8) public votesRecieved;
    constructor(bytes32[] memory candidateNames) public {
        candidateList = candidateNames;
    }
    function voteForCandidate(bytes32 candidate) public {
        require(validateCandidates(candidate));
        votesRecieved[candidate] += 1;
    }
    function totalVotesFor(bytes32 candidate) public view returns(uint8){
        return votesRecieved[candidate];
    }
    function validateCandidates(bytes32 candidate) public view returns(bool){
        for(uint i = 0 ; i < candidateList.length ; i++){
            if(candidateList[i] == candidate){
                return true;
            }
        }
        return false;
    }
}