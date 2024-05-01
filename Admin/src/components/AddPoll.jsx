import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export const AddPoll = () => {
    const [polls, setPolls] = useState([]);
    const [pollName, setPollName] = useState('');
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [isAddingPoll, setIsAddingPoll] = useState(false);
    const navigate = useNavigate();

    const candidates = [
        { id: 1, name: 'John Doe', age: 30, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 28, city: 'Los Angeles' },
        { id: 3, name: 'Mike Johnson', age: 35, city: 'Chicago' },
        { id: 4, name: 'Emily Brown', age: 32, city: 'San Francisco' },
    ];

    // Load saved polls data from local storage on component mount
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('savedPollsData'));
        if (savedData) {
            setPolls(savedData);
        }
    }, []);

    const handleCandidateSelection = (candidateId) => {
        if (selectedCandidates.includes(candidateId)) {
            setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
        } else {
            setSelectedCandidates([...selectedCandidates, candidateId]);
        }
    };

    const saveSelectedCandidatesAsPoll = () => {
        if (pollName.trim() !== '' && selectedCandidates.length > 0) {
            const selectedCandidateDetails = selectedCandidates.map(candidateId => {
                const selectedCandidate = candidates.find(candidate => candidate.id === candidateId);
                return {
                    id: selectedCandidate.id,
                    name: selectedCandidate.name,
                    age: selectedCandidate.age,
                    city: selectedCandidate.city
                };
            });
    
            const newPoll = { name: pollName, candidates: selectedCandidateDetails, isOpen: true };
            setPolls([...polls, newPoll]);
            setPollName('');
            setSelectedCandidates([]);
            setIsAddingPoll(false);
            
            // Save updated polls data to local storage
            localStorage.setItem('savedPollsData', JSON.stringify([...polls, newPoll]));
        }
    };

    const stopPoll = (pollIndex) => {
        const updatedPolls = [...polls];
        updatedPolls[pollIndex].isOpen = false;
        setPolls(updatedPolls);
    
        // Extract poll data
        const { name: pollName, id: pollId, candidates } = updatedPolls[pollIndex];
        const candidateDetails = candidates.map(candidate => ({
            id: candidate.id,
            name: candidate.name
        }));
    
        // Remove specific poll data from local storage
        const savedData = JSON.parse(localStorage.getItem('savedPollsData'));
        if (savedData) {
            const newData = savedData.filter((_, index) => index !== pollIndex);
            localStorage.setItem('savedPollsData', JSON.stringify(newData));
        }
    
        // Navigate to Ended Polls route with poll data as state
        navigate('/ended-polls', { state: { pollData: { pollName, pollId, candidateDetails } } });
    };
    
  
    return (
        <div>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '50px 0',
                backgroundColor: '#f5f5f5',
                fontFamily: 'Arial, sans-serif'
            }}>
                <h2 style={{ marginBottom: '30px', color: '#333' }}>Poll Page</h2>
                {!isAddingPoll && (
                    <button
                        onClick={() => setIsAddingPoll(true)}
                        style={{
                            padding: '15px 30px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Add Poll
                    </button>
                )}
                {isAddingPoll && (
                    <div style={{ marginTop: '30px', maxWidth: '800px', width: '100%' }}>
                        <h3>Add Poll</h3>
                        <input
                            type="text"
                            placeholder="Enter Poll Name"
                            value={pollName}
                            onChange={(e) => setPollName(e.target.value)}
                            style={{
                                marginBottom: '20px',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                width: '100%'
                            }}
                        />
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                border: '1px solid #ddd',
                                borderRadius: '5px'
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Select</th>
                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Name</th>
                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Age</th>
                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map(candidate => (
                                    <tr key={candidate.id}>
                                        <td style={{ paddingLeft: '90px', borderBottom: '1px solid #ddd' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCandidates.includes(candidate.id)}
                                                onChange={() => handleCandidateSelection(candidate.id)}
                                            />
                                        </td>
                                        <td style={{ paddingLeft: '90px', borderBottom: '1px solid #ddd' }}>{candidate.name}</td>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>{candidate.age}</td>
                                        <td style={{ paddingLeft: '90px', borderBottom: '1px solid #ddd' }}>{candidate.city}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ marginTop: '20px' }}>
                            <button
                                onClick={saveSelectedCandidatesAsPoll}
                                style={{
                                    padding: '15px 30px',
                                    fontSize: '16px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                Save Selected Candidates as Poll
                            </button>
                        </div>
                    </div>
                )}
                <div style={{ marginTop: '30px', maxWidth: '800px', width: '100%' }}>
                    <h3>Polls</h3>
                    {polls.map((poll, index) => (
                        <div key={index} style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '5px', padding: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                            <h4 style={{ marginBottom: '10px', fontSize: '20px', color: '#333' }}>{poll.name}</h4>
                            <ul>
                                {poll.candidates.map(candidate => (
                                    <li key={candidate.id} style={{ fontSize: '16px', marginBottom: '5px' }}>{candidate.name}</li>
                                ))}
                            </ul>
                            {poll.isOpen && (
                                <button
                                    onClick={() => stopPoll(index)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        backgroundColor: '#dc3545',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                >
                                    Stop Poll and View Results
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddPoll;
