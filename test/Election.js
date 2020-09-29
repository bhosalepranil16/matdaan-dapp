const assert = require('assert');

const Election = artifacts.require("./Election.sol");

contract("Election",function(accounts){
    it("initializes with proper values",function(){
        let electionInstance;
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            return electionInstance.candidatesCount();
        }).then(function(candidatesCount){
            assert.equal(candidatesCount, 0, "incorrect value");
            return electionInstance.votersCount();
        }).then(function(votersCount){
            assert.equal(votersCount,0,"incorrect value");
            return electionInstance.admin();
        }).then(function(admin){
            assert.equal(admin, '0xc170B9bE66725869796D1422Ce8fE0177b4e18Ad',"incorrect address");
        })
    });

    it("register candidates",async function(){
        let electionInstance;
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            return electionInstance.registerCandidates("Candidate 1",{from : accounts[0]});
        }).then(function(c){
            return electionInstance.candidatesCount();
        }).then(function(candidatesCount){
            assert.equal(candidatesCount,1,"incorrect value");
        })
    });
});