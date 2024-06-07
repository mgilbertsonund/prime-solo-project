import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPreferences = () => {
    const [bookmakers, setBookmakers] = useState([]);
    const [userPreferences, setUserPreferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBookmakers, setSelectedBookmakers] = useState([]);

    useEffect(() => {
        const fetchBookmakers = async () => {
            try {
                const response = await axios.get('/api/bookmakers');
                setBookmakers(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchUserPreferences = async () => {
            try {
                const response = await axios.get('/api/user/preferences');
                setUserPreferences(response.data);
                setSelectedBookmakers(response.data.preferences || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookmakers();
        fetchUserPreferences();
    }, []);

    const handleToggleBookmaker = (bookmakerId) => {
        setSelectedBookmakers((prevState) =>
            prevState.includes(bookmakerId)
                ? prevState.filter((id) => id !== bookmakerId)
                : [...prevState, bookmakerId]
        );
    };

    const handleSavePreferences = async () => {
        try {
            await axios.post('/api/user/preferences', {
                preferences: selectedBookmakers,
            });
            // Optionally update local state or show a success message
        } catch (error) {
            // Handle error
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-preferences">
            <h2>Manage Your Bookmaker Preferences</h2>
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
    );
};

export default UserPreferences;
