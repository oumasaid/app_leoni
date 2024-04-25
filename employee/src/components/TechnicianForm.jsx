import React, { useState } from "react";

function TechnicianForm({ temperatureValues }) {
  const [verificationValues, setVerificationValues] = useState({
    value1: "",
    value2: "",
    value3: "",
  });
  const [averageValue, setAverageValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Technician</h2>
      <div>
        {/* Afficher les valeurs de température si elles sont disponibles */}
        {temperatureValues && (
          <div>
            <p>Temperature Value 1: {temperatureValues.value1}</p>
            <p>Temperature Value 2: {temperatureValues.value2}</p>
            <p>Temperature Value 3: {temperatureValues.value3}</p>
          </div>
        )}

        <h3>Verification of temperature</h3>
        <label>Value Technician 1:</label>
        <input
          type="number"
          name="value1"
          value={verificationValues.value1}
          onChange={handleVerificationChange}
        />
        <label>Value Technician 2:</label>
        <input
          type="number"
          name="value2"
          value={verificationValues.value2}
          onChange={handleVerificationChange}
        />
        <label>Value Technician 3:</label>
        <input
          type="number"
          name="value3"
          value={verificationValues.value3}
          onChange={handleVerificationChange}
        />

        {/* Supprimez le bouton de calcul de la moyenne */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* Affichez la valeur moyenne dans un champ texte */}
        <label>Average Value:</label>
        <input
          type="text"
          value={averageValue}
          onChange={(e) => setAverageValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TechnicianForm;
