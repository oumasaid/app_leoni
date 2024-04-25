import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../style/Login.css";
import leoni_logo from "../leoni1.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  return (
    <div className="login-background">
      <section className="login-page hero is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container" style={{ backgroundColor: "transparent" }}>
            <div className="columns is-centered ">
              <div className="column is-4">
                <form onSubmit={Auth} className="box">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={leoni_logo}
                      alt="Italian Trulli"
                      style={{ width: "200px" }}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <span className="icon is-small is-left">
                        <FaUser />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                      />
                      <span className="icon is-small is-left">
                        <FaLock />
                      </span>
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      id="login-button"
                      type="submit"
                      className="button is-fullwidth"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
