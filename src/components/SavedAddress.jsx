import React from "react";

const SavedAddresses = ({ savedAddresses, onSelectAddress, onRemoveAddress, onSaveAddress }) => {
  return (
    <div className="saved-addresses-container">
     
     
      <h1 className="saved-address-title">Saved Addresses</h1>
      
      <ul 
      className="saved-address-container"
      style={{ listStyleType: "none", padding: 0 }}>
        {savedAddresses.map((address) => (
          <li key={address.id} className="saved-address-item">
            <div>
              <span>{address.type}:</span> {address.details}
            </div>
            <div>
              <button
                className="select-address-button"
                onClick={() => onSelectAddress(address)}
              >
                Select
              </button>
              <button
                className="remove-address-button"
                onClick={() => onRemoveAddress(address.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedAddresses;
