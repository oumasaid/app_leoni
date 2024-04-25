import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineCaretRight } from "react-icons/ai";

const Status = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      {/* Bouton "Status" */}
      <button
        className="button is-white sidebar-button"
        onClick={toggleOptions}
      >
        <span className="icon">
          <AiOutlineCaretRight className="sidebar-icon" />
        </span>
        <span>Status</span>
      </button>

      {/* Contenu des boutons "Status" */}
      {showOptions && (
        <ul>
          {/* Bouton "Shrink Status" */}
          <li>
            <NavLink to="/shrink_status">
              <AiOutlineCaretRight className="sidebar-icon" /> Shrink Status
            </NavLink>
          </li>
          {/* Bouton "Welding Status" */}
          <li>
            <NavLink to="/welding_status">
              <AiOutlineCaretRight className="sidebar-icon" /> Welding Status
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Status;
