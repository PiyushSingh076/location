import React from "react";

const SavedAddresses = ({ savedAddresses }) => {
  return (
    <div className="saved-addresses-container">
      <h3 style={{ textAlign: "center" }}>Saved Addresses</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {savedAddresses.map((addr) => (
          <li key={addr.id} className="saved-address-item">
            <span className="saved-address-type">{addr.type}:</span> {addr.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedAddresses;
