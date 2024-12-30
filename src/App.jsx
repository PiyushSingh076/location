import React, { useState, useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import './App.css'; // Import the updated CSS file
import MapComponent from "./Components/MapComponent";
import ButtonContainer from "./Components/ButtonContainer";
import AddressForm from "./Components/AddressForm";
import SavedAddresses from "./Components/SavedAddress";

const libraries = ["places"];
const center = { lat: 37.7749, lng: -122.4194 };

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgQHPtD2gAzsp7fnrFN6bt8ZPh2pIKMHU",
    libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(center);
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [manualSearch, setManualSearch] = useState(false);

  const customMarkerImage = "https://cdn-icons-png.flaticon.com/128/684/684908.png";

  const autocompleteRef = useRef(null); // Ref to store the Autocomplete instance

  useEffect(() => {
    const fetchAddresses = async () => {
      setSavedAddresses([
        { id: 1, type: "Home", details: "123 Main St, SF, CA" },
        { id: 2, type: "Office", details: "456 Market St, SF, CA" },
        { id: 3, type: "Custom", details: "789 Pine St, SF, CA" },
      ]);
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (window.google && address) {
      const inputField = document.getElementById("address-input");
      const options = {
        types: ["geocode"],
      };

      const autocompleteInstance = new window.google.maps.places.Autocomplete(inputField, options);
      setAutocomplete(autocompleteInstance); // Store autocomplete instance in state
      autocompleteInstance.addListener("place_changed", handlePlaceSelect);

      return () => {
        if (autocompleteInstance) {
          window.google.maps.event.clearInstanceListeners(autocompleteInstance);
        }
      };
    }
  }, [address]); // Re-run the effect when the address changes

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
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

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setAddress(place.formatted_address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setSelectedLocation({ lat, lng });
    }
  };

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          setAddress("");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
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
      <h1 className="title">Location</h1>

      <div className="map-container">
        <MapComponent
          selectedLocation={selectedLocation}
          handleMapClick={handleMapClick}
          customMarkerImage={customMarkerImage}
        />
      </div>

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

      <div className="saved-addresses-container">
        <h2 className="saved-addresses-title">Saved Addresses</h2>
        <SavedAddresses savedAddresses={savedAddresses} />
      </div>
    </div>
  );
}

export default App;
