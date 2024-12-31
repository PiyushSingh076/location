import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import "./App.css";
import MapComponent from "./Components/MapComponent";
import ButtonContainer from "./Components/ButtonContainer";
import AddressForm from "./Components/AddressForm";
import SavedAddresses from "./Components/SavedAddress";

const libraries = ["places"];
const center = { lat: 37.7749, lng: -122.4194 };
const apiKey = import.meta.env.VITE_APP_API_KEY;

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(center);
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [manualSearch, setManualSearch] = useState(false);

  const customMarkerImage = "https://cdn-icons-png.flaticon.com/128/684/684908.png";

  useEffect(() => {
    setSavedAddresses([
      { id: 1, type: "Office", details: "123 Main St, SF, CA", coordinates: { lat: 37.7749, lng: -122.4194 } }
      
    ]);
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
  };

  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      setAddress(place.formatted_address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setSelectedLocation({ lat, lng });
    }
  };

  const handleSaveAddress = () => {
    const newAddress = {
      id: savedAddresses.length + 1,
      type: addressType,
      details: address,
      coordinates: selectedLocation,
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    setAddress("");
    setAddressType("Home");
  };

  const handleSelectAddress = (addr) => {
    setSelectedLocation(addr.coordinates);
  };

  const handleRemoveAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((addr) => addr.id !== id));
  };

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation({ lat: latitude, lng: longitude });
        setAddress("");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const toggleManualSearch = () => {
    setManualSearch(!manualSearch);
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <div className="container">
      <h1 className="title">Location App</h1>
      <MapComponent className="map-container"
        selectedLocation={selectedLocation}
        handleMapClick={handleMapClick}
        customMarkerImage={customMarkerImage}
      />
      <ButtonContainer
        enableLocation={enableLocation}
        toggleManualSearch={toggleManualSearch}
        manualSearch={manualSearch}
      />
      {manualSearch && (
        <AddressForm
          address={address}
          setAddress={setAddress}
          handlePlaceSelect={handlePlaceSelect}
          addressType={addressType}
          setAddressType={setAddressType}
          handleSaveAddress={handleSaveAddress}
        />
      )}
      <SavedAddresses
        savedAddresses={savedAddresses}
        onSelectAddress={handleSelectAddress}
        onRemoveAddress={handleRemoveAddress}
      />
    </div>
  );
}

export default App;
