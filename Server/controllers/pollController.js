const Poll = require('../models/pollModel');
const Vote = require('../models/voteModel');
const contractModel = require('../models/contractModel')

// Controller method for creating a new poll
exports.createPoll = async (req, res) => {
  try {
    const { name, question, options, duration } = req.body;
    const poll = await Poll.insertPoll(name, question, options, duration);
    const optionsArray = options.split(','); // Assuming options are sent as comma-separated values
    const receipt = await contractModel.createPoll(question, optionsArray);
    res.status(201).json({ poll });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller method for deleting a poll by ID
exports.deletePoll = async (req, res) => {
  try {
    const { id: pollId } = req.query;
    console.log(pollId)
    const deletedPoll = await Poll.deletePoll(pollId);
    if (!deletedPoll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    await Vote.deleteMany({ poll: pollId });

    res.status(200).json({ deletedPoll });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
exports.viewActivePolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    // Define an object to store vote counts for each option across all polls
    const aggregatedVotes = [];
    // Loop through each poll
    for (const poll of polls) {
        // Initialize an object to store vote counts for each option of the current poll
        const pollData = {
            id: poll._id,
            question: poll.question,
            time: poll.startTime,
            options: {}
        };
        // Loop through each option in the poll
        for (const option of poll.options) {
            // Count votes for the current option in the current poll
            const voteCount = await Vote.countDocuments({ poll: poll._id, option: option });
        
            // Add the vote count to the pollData object
            pollData.options[option] = voteCount;
        }
        // Add the pollData object to the aggregatedVotes object
        aggregatedVotes.push(pollData);    }

    res.status(200).json( aggregatedVotes );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method for viewing all polls
exports.viewAllPolls = async (req, res) => {
    try {
      // Find all polls
      const allPolls = await Poll.find();
      res.status(200).json({ allPolls });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.vote = async (req, res) => {
    try {
      const { pollId } = req.body;
      const { option } = req.body;
      
      // Retrieve the poll from the database
      const poll = await Poll.findById(pollId);
      if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
      }
  
      // Check if the user has already voted for this poll
      const existingVote = await Vote.findOne({ poll: pollId, user: req.user.id });
      if (existingVote) {
        return res.status(400).json({ error: 'You have already voted on this poll' });
      }
  
      // Check if the selected option is valid
      if (!poll.options.includes(option)) {
        return res.status(400).json({ error: 'Invalid option selected' });
      }
  
      // Insert the vote into the votes table
      await Vote.insertVote(pollId, req.user.id, option);
      const receipt = await contractModel.vote(pollId, option);
  
      // Respond with the updated poll
      res.status(200).json({ poll });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
