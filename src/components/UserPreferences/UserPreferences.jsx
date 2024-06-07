import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPreferences.css';

const UserPreferences = () => {
    const [bookmakers, setBookmakers] = useState([]);
    const [selectedBookmakers, setSelectedBookmakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saved, setSaved] = useState(false); // State to track if preferences were saved successfully

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookmakersResponse = await axios.get('/api/bookmakers');
                setBookmakers(bookmakersResponse.data);

                // Fetch user preferences (assuming you have an API endpoint for this)
                const preferencesResponse = await axios.get('/api/user/bookmaker-preferences');
                setSelectedBookmakers(preferencesResponse.data.preferences || []);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleToggleBookmaker = (bookmakerId) => {
        setSelectedBookmakers(prevState =>
            prevState.includes(bookmakerId)
                ? prevState.filter(id => id !== bookmakerId)
                : [...prevState, bookmakerId]
        );
    };

    const handleSavePreferences = async () => {
        try {
            await axios.post('/api/user/bookmaker-preferences', {
                preferences: selectedBookmakers,
            });
            setSaved(true); // Update state to indicate preferences were saved successfully
        } catch (error) {
            // Handle error
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-preferences">
            <h2>Manage Your Bookmaker Preferences</h2>
            {saved && <p>Preferences saved successfully!</p>}
            <div>
                <h3>Edit Bookmakers:</h3>
                <ul className="bookmakers-list">
                    {bookmakers.map((bookmaker) => (
                        <li key={bookmaker.bookmaker_id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedBookmakers.includes(bookmaker.bookmaker_id)}
                                    onChange={() => handleToggleBookmaker(bookmaker.bookmaker_id)}
                                />
                                {bookmaker.bookmaker_name}
                            </label>
                        </li>
                    ))}
                </ul>
                <button onClick={handleSavePreferences}>Save Preferences</button>
            </div>
        </div>
    );
};

export default UserPreferences;
