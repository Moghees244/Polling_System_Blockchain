import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{ 
            backgroundColor: '#000', // Change background color to black
            padding: '10px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            color: '#fff' // Change text color to white
        }}>
            <h1>E-Voting</h1>
            <div style={{ display: 'flex', gap: '20px' , paddingLeft: '-180px' }}> {/* Align links to the left */}
                <Link to="/" style={{ textDecoration: 'none', padding: '20px',color: '#fff' }}>Home</Link> {/* Apply white color */}
                <Link to="/add-poll" style={{ textDecoration: 'none',padding: '20px', color: '#fff' }}>Add Poll</Link> {/* Apply white color */}
                <Link to="/ended-polls" style={{ textDecoration: 'none', padding: '20px',color: '#fff' }}>Ended Polls</Link> {/* Apply white color */}
                <Link to="/poll-results" style={{ textDecoration: 'none', padding: '20px',color: '#fff' }}>Poll Results</Link> {/* Apply white color */}
            
            </div>
        </div>
    );
}

export default Header;
