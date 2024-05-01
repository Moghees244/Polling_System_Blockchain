import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const EndedPolls = () => {
    const location = useLocation();
    const { state } = location;
    const [pollsData, setPollsData] = useState([]);

    // Load poll data from local storage on component mount
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('endedPollsData'));
        if (savedData) {
            setPollsData(savedData);
        }
    }, []);

    // Update pollsData state when new data is received
    useEffect(() => {
        if (state && state.pollData) {
            const newData = state.pollData;
            setPollsData(prevData => [...prevData, newData]);
            // Save updated data to local storage
            localStorage.setItem('endedPollsData', JSON.stringify([...pollsData, newData]));
        }
    }, [state]);

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h2 style={styles.heading}>Ended Polls</h2>
                {pollsData.length === 0 ? (
                    <div>No poll data received</div>
                ) : (
                    pollsData.map((poll, index) => (
                        <div key={index} style={styles.pollContainer}>
                            <h3 style={styles.pollName}>Poll Name: {poll.pollName}</h3>
                            <ul style={styles.candidateList}>
                                {poll.candidateDetails.map(candidate => (
                                    <li key={candidate.id} style={styles.candidateItem}>
                                        <span style={styles.candidateId}>ID: {candidate.id}</span>
                                        <span style={styles.candidateName}>Name: {candidate.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EndedPolls;

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: 'auto',
        padding: '30px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    pollContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    pollName: {
        fontSize: '20px',
        color: '#007bff',
        marginBottom: '20px',
    },
    candidateList: {
        listStyle: 'none',
        padding: 0,
    },
    candidateItem: {
        marginBottom: '10px',
    },
    candidateId: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    candidateName: {
        color: '#555',
    },
};

