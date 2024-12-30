import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const defaultMarkerImage = "https://cdn-icons-png.flaticon.com/128/684/684908.png";

const MapComponent = ({ selectedLocation, handleMapClick }) => {
  return (
    <GoogleMap
      mapContainerClassName="map-container"
      mapContainerStyle={{ width: "100%", height: "50vh" }} // Adjust width to 80% and center it
      zoom={12}
      center={selectedLocation}
      onClick={handleMapClick}
    >
      <Marker
        position={selectedLocation}
        icon={{
          url: defaultMarkerImage,
          scaledSize: new window.google.maps.Size(40, 40), // Marker size adjustment
        }}
      />
    </GoogleMap>
  );
};

export default MapComponent;
