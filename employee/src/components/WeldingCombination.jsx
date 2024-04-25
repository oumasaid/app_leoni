import React from "react";
import RequirementDataForm from "./RequirementDataForm";
import MicrographEvaluation from "./MicrographEvaluation";

const WeldingCombination = () => {
  return (
    <div>
      <h2>Welding Combination</h2>

      {/* Ajout d'une séparation visuelle */}
      <hr style={{ margin: "20px 0" }} />

      <div>
        {/* Role: Production Technology */}
        <div style={{ marginBottom: "40px" }}>
          <h3>Requirement Data Form</h3>
          <RequirementDataForm />
        </div>

        {/* Role: QMLaboratory */}
        <div>
          <h3>Micrograph Evaluation</h3>
          <MicrographEvaluation />
        </div>
      </div>
    </div>
  );
};

export default WeldingCombination;
