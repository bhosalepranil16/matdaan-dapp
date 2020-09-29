pragma solidity >=0.4.21 <0.7.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        string symbol;
        uint totalVotes;
    }

    struct Voter {
        bool hasRegistered;
        bool hasVoted;
    }

    uint[3] timePeriod; 

    mapping(address => Voter) public voters;
    mapping(uint => Candidate) public candidates;
    
    address public admin;

    uint public votersCount;
    uint public candidatesCount;
    string public winner;

    event CandidateRegistered(uint _id, string _name,string _symbol);
    event Voted(address);
    event DeclareWinner(string _winner);

    constructor() public {
        admin = msg.sender;
        timePeriod[0] = block.timestamp + 10 minutes;
        timePeriod[1] = block.timestamp + 12 minutes;
        timePeriod[2] = block.timestamp + 14 minutes;
    }

    function registerCandidates(string memory _name,string memory _symbol) public {
        require(block.timestamp <= timePeriod[0]);
        require(msg.sender == admin);
        candidates[candidatesCount] = Candidate(candidatesCount,_name,_symbol,0);
        emit CandidateRegistered(candidatesCount, _name,_symbol);
        candidatesCount++;
    }

    function registerVoters() public {
        require(block.timestamp <= timePeriod[0]);
        require(!voters[msg.sender].hasRegistered);
        voters[msg.sender] = Voter(false, false);
        voters[msg.sender].hasRegistered = true;
        votersCount++;
    }

    function vote(uint _id) public {
        require(block.timestamp >= timePeriod[0] && block.timestamp <= timePeriod[1]);
        require(voters[msg.sender].hasRegistered);
        require(!voters[msg.sender].hasVoted);
        require(_id >= 0 && _id < candidatesCount);
        candidates[_id].totalVotes++;
        voters[msg.sender].hasVoted = true;
        emit Voted(msg.sender);
    }

    function declareWinner() public {
        require(block.timestamp >= timePeriod[1] && block.timestamp <= timePeriod[2]);
        require(msg.sender == admin);
        uint max = candidates[0].totalVotes; 
        uint ind = 0;
        for(uint i=0;i<candidatesCount;i++) {
            if(max < candidates[i].totalVotes) {
                max = candidates[i].totalVotes;
                ind = i;
            }
        }
        emit DeclareWinner(candidates[ind].name);
        winner = candidates[ind].name;
    }
}