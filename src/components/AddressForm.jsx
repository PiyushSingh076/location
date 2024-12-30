import React, { useRef, useEffect } from "react";

const AddressForm = ({
  address,
  setAddress,
  handlePlaceSelect,
  addressType,
  setAddressType,
  handleSaveAddress,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
      });
      autocomplete.addListener("place_changed", () => handlePlaceSelect(autocomplete.getPlace()));
    }
  }, [handlePlaceSelect]);

  return (
    <div className="address-form">
      <input
        ref={inputRef}
        className="address-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Search for an address"
      />
      <select value={addressType} onChange={(e) => setAddressType(e.target.value)}>
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Custom">Custom</option>
      </select>
      <button className="save-button"onClick={handleSaveAddress}>Save Address</button>
    </div>
  );
};

export default AddressForm;
