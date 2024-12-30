import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";

const defaultMarkerImage = "https://cdn-icons-png.flaticon.com/128/684/684908.png";

const MapComponent = ({ selectedLocation, handleMapClick }) => {
  const mapRef = useRef(null); // Reference to hold the map instance
  const markerRef = useRef(null); // Reference to hold the marker instance

  // Initialize map and marker on map load
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      const googleMap = mapRef.current;

      // Create a new marker
      if (markerRef.current) {
        markerRef.current.setPosition(selectedLocation); // Update marker position if already exists
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: selectedLocation,
          map: googleMap,
          icon: {
            url: defaultMarkerImage,
            scaledSize: new window.google.maps.Size(40, 40), // Marker size adjustment
          },
        });
      }

      googleMap.setCenter(selectedLocation); // Center the map on the selected location
    }
  }, [selectedLocation]); // Re-run whenever selectedLocation changes

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      mapContainerStyle={{ width: "100%", height: "50vh" }}
      zoom={12}
      center={selectedLocation}
      onClick={handleMapClick}
      onLoad={(map) => {
        mapRef.current = map; // Set map instance
      }}
    />
  );
};

export default MapComponent;
