import React from "react";

const ButtonContainer = ({ enableLocation, toggleManualSearch, manualSearch }) => {
  return (
    <div className="button-container">
      <button onClick={enableLocation} className="enable-location-button">
        Enable Location
      </button>

      <button onClick={toggleManualSearch} className="search-button">
        {manualSearch ? "Cancel Search" : "Search Manually"}
      </button>
    </div>
  );
};

export default ButtonContainer;
