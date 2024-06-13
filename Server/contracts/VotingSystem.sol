// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Poll {
        string question;
        string[] options;
        mapping(uint => uint) votes; // optionId => number of votes
        bool active;
    }

    address public admin;
    uint public pollCount;
    mapping(uint => Poll) public polls;
    mapping(address => mapping(uint => bool)) public hasVoted; // voter address => pollId => voted or not

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier pollExists(uint pollId) {
        require(pollId < pollCount, "Poll does not exist");
        _;
    }

    event PollCreated(uint pollId, string question, string[] options);
    event Voted(uint pollId, uint optionId, address voter);

    constructor() {
        admin = msg.sender;
    }

    function createPoll(string memory question, string[] memory options) public onlyAdmin {
        require(options.length > 1, "At least two options are required");
        Poll storage newPoll = polls[pollCount++];
        newPoll.question = question;
        newPoll.options = options;
        newPoll.active = true;
        emit PollCreated(pollCount - 1, question, options);
    }

    function viewPoll(uint pollId) public view pollExists(pollId) returns (string memory question, string[] memory options, bool active) {
        Poll storage poll = polls[pollId];
        return (poll.question, poll.options, poll.active);
    }

    function vote(uint pollId, uint optionId) public pollExists(pollId) {
        Poll storage poll = polls[pollId];
        require(poll.active, "Poll is not active");
        require(optionId < poll.options.length, "Invalid option");
        require(!hasVoted[msg.sender][pollId], "You have already voted in this poll");

        poll.votes[optionId]++;
        hasVoted[msg.sender][pollId] = true;
        emit Voted(pollId, optionId, msg.sender);
    }

    function endPoll(uint pollId) public onlyAdmin pollExists(pollId) {
        Poll storage poll = polls[pollId];
        require(poll.active, "Poll is already ended");
        poll.active = false;
    }

    function getResults(uint pollId) public view pollExists(pollId) returns (uint[] memory results) {
        Poll storage poll = polls[pollId];
        uint optionsCount = poll.options.length;
        results = new uint[](optionsCount);
        for (uint i = 0; i < optionsCount; i++) {
            results[i] = poll.votes[i];
        }
    }
}