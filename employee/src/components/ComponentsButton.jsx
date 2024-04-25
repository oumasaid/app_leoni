import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineCaretRight, AiOutlineApartment } from "react-icons/ai";

const Menu = () => {
  const [showComponents, setShowComponents] = useState(false);
  const [showMachines, setShowMachines] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  const toggleComponents = () => {
    setShowComponents(!showComponents);
  };

  const toggleMachines = () => {
    setShowMachines(!showMachines);
  };

  const toggleMaterials = () => {
    setShowMaterials(!showMaterials);
  };

  return (
    <div className="menu">
      {/* Bouton "Components" */}
      <button
        className="button is-white sidebar-button"
        onClick={toggleComponents}
      >
        <span className="icon">
          <AiOutlineApartment className="sidebar-icon" />
        </span>
        <span>Components</span>
      </button>

      {/* Contenu des boutons "Components" */}
      {showComponents && (
        <ul>
          {/* Section Machines */}
          <li>
            {/* Bouton "Machines" */}
            <button
              className="button is-white sidebar-button"
              onClick={toggleMachines}
            >
              <span className="icon">
                <AiOutlineApartment className="sidebar-icon" />
              </span>
              <span>Machines</span>
            </button>
            {/* Contenu des boutons "Machines" */}
            {showMachines && (
              <ul>
                <li>
                  <NavLink to="/machines">
                    <AiOutlineCaretRight className="sidebar-icon" /> Shrink
                    Machines
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/weldings">
                    <AiOutlineCaretRight className="sidebar-icon" /> Welding
                    Machines
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Section Materials */}
          <li>
            {/* Bouton "Materials" */}
            <button
              className="button is-white sidebar-button"
              onClick={toggleMaterials}
            >
              <span className="icon">
                <AiOutlineApartment className="sidebar-icon" />
              </span>
              <span>Materials</span>
            </button>
            {/* Contenu des boutons "Materials" */}
            {showMaterials && (
              <ul>
                <li>
                  <NavLink to="/shrinksleeves">
                    <AiOutlineCaretRight className="sidebar-icon" /> Shrink
                    Sleeves
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wires">
                    <AiOutlineCaretRight className="sidebar-icon" /> Wires
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ring-terminals">
                    <AiOutlineCaretRight className="sidebar-icon" /> Ring
                    Terminals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/glues">
                    <AiOutlineCaretRight className="sidebar-icon" /> Glue
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
