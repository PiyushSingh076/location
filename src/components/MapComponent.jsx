import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";



const MapComponent = ({ selectedLocation, handleMapClick }) => {
  const mapRef = useRef(null); 
  const markerRef = useRef(null); 

  // Initialize map and marker on map load
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      const googleMap = mapRef.current;

      
      if (markerRef.current) {
        markerRef.current.setPosition(selectedLocation); 
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: selectedLocation,
          map: googleMap,
          icon: {
            url: defaultMarkerImage,
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });
      }

      googleMap.setCenter(selectedLocation); 
    }
  }, [selectedLocation]); 

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      mapContainerStyle={{ width: "100%", height: "50vh" }}
      zoom={12}
      center={selectedLocation}
      onClick={handleMapClick}
      onLoad={(map) => {
        mapRef.current = map; 
      }}
    />
  );
};

export default MapComponent;
