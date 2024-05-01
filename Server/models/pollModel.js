const mongoose = require('mongoose');

// Define the schema for the Polls collection
const pollSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name is required']
  },
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  options: {
    type: [{
      type: String,
      required: true
    }],
    validate: {
      validator: function(arr) {
        return arr.length >= 2; // Ensure there are at least two options
      },
      message: props => `Poll must have at least 2 options`
    }
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Duration is required'],
    min: [10, 'Duration must be at least 10 minute']
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'ended'],
    default: 'active'
  },
});

// Model method for inserting a new poll
pollSchema.statics.insertPoll = async function(name, question, options, duration) {
  try {
    const newPoll = new this({
      name: name,
      question: question,
      options: options,
      duration: duration
    });
    const savedPoll = await newPoll.save();
    console.log("Poll inserted successfully:", savedPoll);
    return savedPoll;
  } catch (error) {
    console.error("Error inserting poll:", error);
    throw error;
  }
};

// Model method for deleting a poll by ID
pollSchema.statics.deletePoll = async function(pollId) {
  try {
    const deletedPoll = await this.findByIdAndDelete(pollId);
    if (!deletedPoll) {
      console.log("Poll not found.");
      return null;
    }
    console.log("Poll deleted successfully:", deletedPoll);
    return deletedPoll;
  } catch (error) {
    console.error("Error deleting poll:", error);
    throw error;
  }
};

// Create a model for the Polls collection
const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
