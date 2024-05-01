import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/Login';
import { AddVoter } from './components/AddVoter';
import { AddPoll } from './components/AddPoll';
import EndedPolls from './components/EndedPolls';
import PollResults from './components/PollResults';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/add-voter" element={<AddVoter />} />
      <Route path="/add-poll" element={<AddPoll />} />
      {/* Pass pollData as a prop to EndedPolls */}
      <Route path="/ended-polls" element={<EndedPolls />} />
      <Route path="/poll-results" element={<PollResults />} />
 </Routes>
  );
}

export default App;
