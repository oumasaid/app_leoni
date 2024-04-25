import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoDocument,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import ComponentsButton from "../components/ComponentsButton";
import Combination from "./Combination";
import Status from "../components/Status";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <ComponentsButton />{" "}
          {/* Afficher le composant ComponentsButton ici */}
          <Combination />{" "}
          {/* <li>
            <NavLink to={"/combination"}>
              <IoDocument /> Combination
            </NavLink>
          </li> */}
          <Status />{" "}
        </ul>
        <div>
          <p className="menu-label">Admin</p>
          <ul className="menu-list">
            <li>
              <NavLink to="/account">
                {/* Changer l'icône ici */}
                <IoPerson /> {/* Exemple: <IoPersonCircleSharp /> */}
                Account
              </NavLink>
            </li>
            <li>
              <NavLink to={"/users"} className="">
                <IoPerson /> Users
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={"/status"} className="">
                <IoPerson /> Status
              </NavLink>
            </li> */}
          </ul>
        </div>

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
