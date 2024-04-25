import React from "react";
import ProductionEngineeringForm from "./ProductionEngineeringForm";
import TechnicianForm from "./TechnicianForm";
import ProductionTechnologyForm from "./ProductionTechnologyForm";
import QualityOperationalForm from "./QualityOperationalForm";
import QMLaboratoryForm from "./QMLaboratoryForm";

const ShrinkingCombination = () => {
  return (
    <div>
      <h2>Shrinking Combination</h2>
      {/* Ajoutez les composants de formulaire requis ici */}
      <div>
        <ProductionEngineeringForm />
        <TechnicianForm />
        <ProductionTechnologyForm />
        <QualityOperationalForm />
        <QMLaboratoryForm />
      </div>
    </div>
  );
};

export default ShrinkingCombination;
