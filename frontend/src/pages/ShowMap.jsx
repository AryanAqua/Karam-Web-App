import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import toast, { Toaster } from 'react-hot-toast';
import Dump1Image from '../assets/DTU Dustbins/Dump1.png';


const locations = [
  {
    id: 1,
    latitude: 28.745324,
    longitude: 77.116939,
    name: "Park",
    description: "Oasis",
    image: Dump1Image,
  },
];

function ShowMap() {
  const [viewState, setViewState] = React.useState({
    longitude: 77.114529,
    latitude: 28.749563,
    zoom: 16,
  });
  const [hoveredLocation, setHoveredLocation] = React.useState(null);

  const handleMarkerHover = (location) => {
    console.log("Marker hovered:", location.name);
    setHoveredLocation(location);
  };

  const handleMarkerLeave = () => {
    console.log("Marker left");
    setHoveredLocation(null);
  };

  const notify = () => toast('Location Reported Successfully');

  const handleMarkerClick = () => {
    console.log("Marker clicked");
    notify();
  };

  console.log("Current hovered location:", hoveredLocation);

  return (
    <div className="w-full h-full relative">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/navigation-day-v1"
        mapboxAccessToken="pk.eyJ1IjoicHVibGljZ3V5b2ZmaWNlciIsImEiOiJjbTBpMGc3eHUwZ2luMmlyMTFqcnI0NWRiIn0.ji5MYJ-QVia6EBxtcG7c7A"
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={handleMarkerClick}
          >
            <div
              onMouseEnter={() => handleMarkerHover(location)}
              onMouseLeave={handleMarkerLeave}
              className="cursor-pointer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/7709/7709786.png"
                alt="Custom Marker"
                className="w-8 h-8"
              />
            </div>
          </Marker>
        ))}
        {hoveredLocation && (
          <Popup
            latitude={hoveredLocation.latitude}
            longitude={hoveredLocation.longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
          >
            <div className="p-2">
              <h3 className="font-bold">{hoveredLocation.name}</h3>
              <img
                src={hoveredLocation.image}
                alt={hoveredLocation.name}
                className="w-full max-h-40 object-cover my-2"
              />
              {/* <button 
                // onClick={notify}
              >
              </button> */}
              <p className="mt-2">{hoveredLocation.description}</p>
            </div>
          </Popup>
        )}
      </Map>
      <Toaster position="top-center" />
    </div>
  );
}

export default ShowMap;