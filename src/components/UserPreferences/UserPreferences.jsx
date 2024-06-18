import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPreferences.css'; 

const UserPreferences = () => {
    const [bookmakers, setBookmakers] = useState([]);
    const [activeBookmakers, setActiveBookmakers] = useState([]);
    const [nonActiveBookmakers, setNonActiveBookmakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookmakersResponse = await axios.get('/api/bookmakers');
                setBookmakers(bookmakersResponse.data);

                const preferencesResponse = await axios.get('/api/user/bookmaker-preferences');
                const activeDetails = preferencesResponse.data || [];

                setActiveBookmakers(activeDetails);

                const activeIds = activeDetails.map(bm => bm.bookmaker_id);
                const nonActive = bookmakersResponse.data.filter(bm => !activeIds.includes(bm.bookmaker_id));
                setNonActiveBookmakers(nonActive);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddBookmaker = (bookmakerId) => {
        const addedBookmaker = nonActiveBookmakers.find(bm => bm.bookmaker_id === bookmakerId);
        setActiveBookmakers(prevState => [...prevState, addedBookmaker]);
        setNonActiveBookmakers(prevState => prevState.filter(bm => bm.bookmaker_id !== bookmakerId));
    };

    const handleRemoveBookmaker = (bookmakerId) => {
        const removedBookmaker = activeBookmakers.find(bm => bm.bookmaker_id === bookmakerId);
        setActiveBookmakers(prevState => prevState.filter(bm => bm.bookmaker_id !== bookmakerId));
        setNonActiveBookmakers(prevState => [...prevState, removedBookmaker]);
    };

    const handleSavePreferences = async () => {
        try {
            const activeIds = activeBookmakers.map(bm => bm.bookmaker_id);
            await axios.post('/api/user/bookmaker-preferences', {
                preferences: activeIds,
            });
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-preferences">
            <h2>Manage Your Bookmaker Preferences</h2>
            <div className="preferences-actions">
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Bookmakers'}
                </button>
                {isEditing && (
                    <button onClick={handleSavePreferences}>Save Preferences</button>
                )}
            </div>
            
            <div className="preferences-container">
                <div className="bookmakers-section">
                    <h3>Active Bookmakers</h3>
                    <ul className="bookmakers-list active">
                        {activeBookmakers.map(bookmaker => (
                            <li key={bookmaker.bookmaker_id}>
                                <span>{bookmaker.bookmaker_name}</span>
                                {isEditing && (
                                    <button onClick={() => handleRemoveBookmaker(bookmaker.bookmaker_id)}>Remove</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {isEditing && (
                    <div className="bookmakers-section">
                        <h3>Non-Active Bookmakers</h3>
                        <ul className="bookmakers-list non-active">
                            {nonActiveBookmakers.map(bookmaker => (
                                <li key={bookmaker.bookmaker_id}>
                                    <span>{bookmaker.bookmaker_name}</span>
                                    <button onClick={() => handleAddBookmaker(bookmaker.bookmaker_id)}>Add</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>        
        </div>
    );
};

export default UserPreferences;
