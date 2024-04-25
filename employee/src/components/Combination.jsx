import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineCaretRight, AiOutlineApartment } from "react-icons/ai";

const Combination = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      {/* Bouton "Combination" */}
      <button
        className="button is-white sidebar-button"
        onClick={toggleOptions}
      >
        <span className="icon">
          <AiOutlineApartment className="sidebar-icon" />
        </span>
        <span>Combination</span>
      </button>

      {/* Contenu des boutons "Combination" */}
      {showOptions && (
        <ul>
          {/* Bouton "Shrinking Combination" */}
          <li>
            <NavLink to="/shrinking_combination">
              <AiOutlineCaretRight className="sidebar-icon" /> Shrinking
              Combination
            </NavLink>
          </li>
          {/* Bouton "Welding Combination" */}
          <li>
            <NavLink to="/welding_combination">
              <AiOutlineCaretRight className="sidebar-icon" /> Welding
              Combination
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Combination;

// import React, { useState } from "react";
// import ProductionEngineeringForm from "./ProductionEngineeringForm";
// import ProductionTechnologyForm from "./ProductionTechnologyForm";
// import TechnicianForm from "./TechnicianForm";
// import QMLaboratoryForm from "./QMLaboratoryForm";
// import QualityOperationalForm from "./QualityOperationalForm";

// const Combination = () => {
//   return (
//     <div>
//       <ProductionEngineeringForm />
//       <TechnicianForm />
//       <ProductionTechnologyForm />
//       <QualityOperationalForm />
//       <QMLaboratoryForm />
//     </div>
//   );
// };

// export default Combination;
