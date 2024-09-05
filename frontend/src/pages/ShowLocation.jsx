import { useEffect, useState } from 'react';
import axios from 'axios';

const ShowLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app/v1/location');
        if (response.data && typeof response.data === 'object') {
          setLocations(Object.values(response.data));
        } else {
          setError('Invalid response data. Expected a JSON object.');
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to fetch locations.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

 
  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="h-full p-4 bg-gradient-to-b from-green-200 to-green-100 overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-800">Top 5 Locations</h1>
      {locations.length === 0 ? (
        <p className="text-gray-700 text-center">No locations found.</p>
      ) : (
        <ul className="space-y-4">
          {locations.slice(0, 3).map(location => (
            <li
              key={location._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-xl font-semibold mb-1 text-green-700">{location.locationName}</p>
              <p className="text-sm text-gray-800 mb-1"><strong>Address:</strong> {location.address}</p>
              <p className="text-sm text-gray-800 mb-1"><strong>Description:</strong> {location.description}</p>
              <p className="text-sm text-gray-700"><strong>Count:</strong> {location.count}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowLocation;
