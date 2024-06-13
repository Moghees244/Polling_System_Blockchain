const contractModel = require("../models/contractModel");

module.exports = {
  //   createPoll: async (req, res) => {
  //     const { question, options } = req.body;
  //     console.log({ question, options });
  //     try {
  //       const optionsArray = options.split(","); // Assuming options are sent as comma-separated values
  //       const receipt = await contractModel.createPoll(question, optionsArray);
  //       res.send(
  //         `Poll created with transaction hash: ${receipt.transactionHash}`
  //       );
  //     } catch (error) {
  //       res.status(500).send(error.toString());
  //     }
  //   },
  createPoll: async (req, res) => {
    const { question, options } = req.body;
    console.log("Received data:", { question, options });
    try {
      const optionsArray = Array.isArray(options)
        ? options
        : options.split(",");
      console.log("Parsed optionsArray:", optionsArray);

      // Call the contract model to create the poll
      const receipt = await contractModel.createPoll(question, optionsArray);
      console.log("Transaction receipt:", receipt);

      res.send(
        `Poll created with transaction hash: ${receipt.transactionHash}`
      );
    } catch (error) {
      console.error("Error in createPoll:", error);
      res.status(500).send(error.toString());
    }
  },
  vote: async (req, res) => {
    const { pollId, optionId } = req.body;
    try {
      const receipt = await contractModel.vote(pollId, optionId);
      res.send(
        `Vote recorded with transaction hash: ${receipt.transactionHash}`
      );
    } catch (error) {
      res.status(500).send(error.toString());
    }
  },
  endPoll: async (req, res) => {
    const { pollId } = req.body;
    try {
      const receipt = await contractModel.endPoll(pollId);
      res.send(`Poll ended with transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  },
  viewPoll: async (req, res) => {
    const { pollId } = req.query;
    try {
      const poll = await contractModel.viewPoll(pollId);
      res.json(poll);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  },
  getResults: async (req, res) => {
    const { pollId } = req.query;
    try {
      const results = await contractModel.getResults(pollId);
      res.json(results);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  },
};
