import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export function AddVoter() {
    const [voterData, setVoterData] = useState({ name: '', cnic: '', city: '', gender: '' });
    const [signature, setSignature] = useState(null);
    const [votersList, setVotersList] = useState([]);
    const inputRef = useRef(null);

    const getImageInput = () => {
        if (inputRef.current) inputRef.current.click();
    };

    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        setSignature(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const newVoter = { ...voterData, signature: signature };
        setVotersList([...votersList, newVoter]);
        // Reset form fields after submission
        setVoterData({ name: '', cnic: '', city: '', gender: '' });
        setSignature(null);
    };

    const deleteVoter = (index) => {
        const updatedList = [...votersList];
        updatedList.splice(index, 1);
        setVotersList(updatedList);
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            margin:'10px',
            flexDirection: 'column', // Adjusted for better alignment
            minHeight: '100vh', // Adjusted to fill the viewport
            backgroundColor: '#f5f5f5' 
        }}>
            <form style={{ 
                backgroundColor: '#fff', 
                padding: '40px', 
                borderRadius: '10px', 
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', 
                width: '300px', 
                textAlign: 'center' 
            }} onSubmit={submitHandler}>
                {/* Form fields */}
                <h2 style={{ 
                    marginBottom: '30px', 
                    color: '#333' 
                }}>Add New Voter</h2>
                 <div style={{ marginBottom: '20px' }}>
                    <input
                        type='text'
                        placeholder='Name'
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            borderBottom: '2px solid #007bff', 
                            backgroundColor: 'transparent', 
                            marginBottom: '15px', 
                            outline: 'none' 
                        }}
                        value={voterData.name}
                        onChange={e => setVoterData({ ...voterData, name: e.target.value })}
                        required
                    />
                </div>
                {/* Other input fields for CNIC, City, Gender */}
                
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type='text'
                        placeholder='CNIC'
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            borderBottom: '2px solid #007bff', 
                            backgroundColor: 'transparent', 
                            marginBottom: '15px', 
                            outline: 'none' 
                        }}
                        value={voterData.cnic}
                        onChange={e => setVoterData({ ...voterData, cnic: e.target.value })}
                        required
                    />
                </div>  
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type='text'
                        placeholder='City'
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            borderBottom: '2px solid #007bff', 
                            backgroundColor: 'transparent', 
                            marginBottom: '15px', 
                            outline: 'none' 
                        }}
                        value={voterData.city}
                        onChange={e => setVoterData({ ...voterData, city: e.target.value })}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <select
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            borderBottom: '2px solid #007bff', 
                            backgroundColor: 'transparent', 
                            marginBottom: '15px', 
                            outline: 'none' 
                        }}
                        required
                        value={voterData.gender}
                        onChange={e => setVoterData({ ...voterData, gender: e.target.value })}
                    >
                        <option value={undefined}>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleSignatureChange}
                        style={{ display: 'none' }}
                        ref={inputRef}
                    />
                    
                    {signature && <span>{signature.name}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <button
                        type='button'
                        onClick={getImageInput}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            backgroundColor: '#007bff', 
                            color: '#fff', 
                            fontSize: '16px', 
                            cursor: 'pointer', 
                            transition: 'background-color 0.3s ease' 
                        }}
                    >
                        Add Signature
                    </button>
                </div>
                <button
                    type='submit'
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        backgroundColor: '#007bff', 
                        color: '#fff', 
                        fontSize: '16px', 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s ease' 
                    }}
                >
                    Add Voter
                </button>
                <Link to="/AddPoll" style={{ 
                    width: '100%', 
                    textDecoration: 'none' // Remove underline from the link
                }}>
                    <button type="submit" style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        backgroundColor: '#007bff', 
                        color   : '#fff', 
                        fontSize: '16px', 
                        margin: '15px 0',
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s ease' 
                    }}>Results</button>
                </Link>
            </form>
            <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontsize: '14px', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>CNIC</th>
                            <th>City</th>
                            <th>Gender</th>
                            <th>Signature</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votersList.map((voter, index) => (
                            <tr key={index}>
                                <td style={{padding: '24px'}}>{voter.name}</td>
                                <td style={{padding: '24px'}}>{voter.cnic}</td>
                                <td style={{padding: '24px'}}>{voter.city}</td>
                                <td style={{padding: '28px'}}>{voter.gender}</td>
                                <td style={{padding: '30px'}}>{voter.signature ? voter.signature.name : '-'}</td>
                                <td style={{padding: '24px'}}>
                                    <button onClick={() => deleteVoter(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
