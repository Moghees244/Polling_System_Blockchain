import React from "react";
import { Bar } from "react-chartjs-2";
import Header from "./Header";

const PollResults = () => {
  // Dummy data for demonstration
  const candidates = ["Candidate A", "Candidate B", "Candidate C", "Candidate D"];
  const votes = [350, 450, 300, 500];

  const data = {
    labels: candidates,
    datasets: [
      {
        label: "Number of Votes",
        backgroundColor: "rgb(125, 60, 152)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        data: votes,
      },
    ],
  };

  const containerStyles = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "rgb(232, 250, 187  )",
    justifyContent: 'center',
  };

  const chartStyles = {
    width: '80%',
    height: '80%',
  };

  return (
    <div>
        <Header/>
    <div style={containerStyles}>
      <h2>Election Results</h2>
      <div style={chartStyles}>
        <Bar data={data} />
      </div>
    </div>
    </div>
  );
};

export default PollResults;
