import React, { useState, useEffect, useRef } from "react";

const AddressForm = ({ address, setAddress, handlePlaceSelect, addressType, setAddressType, handleSaveAddress }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null); // Ref to input field for Autocomplete

  useEffect(() => {
    if (window.google && inputRef.current) {
      const options = {
        types: ["geocode"],
      };
      const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, options);

      autocompleteInstance.addListener("place_changed", handlePlaceSelect);
      setAutocomplete(autocompleteInstance); // Set the Autocomplete instance

      // Cleanup listener on component unmount
      return () => {
        if (autocompleteInstance) {
          window.google.maps.event.clearInstanceListeners(autocompleteInstance);
        }
      };
    }
  }, [handlePlaceSelect]);

  return (
    <div className="address-form">
      <input
        id="address-input"
        className="address-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Search for an address"
/>

      <select 

        value={addressType}
        onChange={(e) => setAddressType(e.target.value)}
      >
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Custom">Custom</option>
      </select>
      <button className="save-button" onClick={handleSaveAddress}>Save Address</button>
    </div>
  );
};

export default AddressForm;
