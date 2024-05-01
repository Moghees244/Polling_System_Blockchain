const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
    onDelete: 'cascade'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voter',
    required: true
  },
  option: {
    type: String,
    required: true
  }
});

// Ensure that each user can vote only once in a poll
voteSchema.index({ poll: 1, user: 1 }, { unique: true });

// Model method for inserting a new vote
voteSchema.statics.insertVote = async function(pollId, userId, option) {
  try {
    const newVote = new this({
      poll: pollId,
      user: userId,
      option: option
    });
    await newVote.save();
    console.log("Vote inserted successfully:", newVote);
    return newVote;
  } catch (error) {
    console.error("Error inserting vote:", error);
    throw error;
  }
};

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
