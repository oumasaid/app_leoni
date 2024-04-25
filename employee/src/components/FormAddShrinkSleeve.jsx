import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddShrinkSleeve = () => {
  const [supplier, setSupplier] = useState("");
  const [type, setType] = useState("");
  const [designation, setDesignation] = useState("");
  const [pn, setPn] = useState("");
  const [suppliedDiameter, setSuppliedDiameter] = useState("");
  const [recoveredDiameter, setRecoveredDiameter] = useState("");
  const [dNet, setDNet] = useState("");
  const [varMin, setVarMin] = useState("");
  const [varMax, setVarMax] = useState("");
  const [minBundleSize, setMinBundleSize] = useState("");
  const [maxBundleSize, setMaxBundleSize] = useState("");
  const [minSizeProg, setMinSizeProg] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null); // State for storing image file

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token available");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Set content type for FormData
    },
  };

  console.log("supplier",supplier);

  const saveShrinkSleeve = async (e) => {
    e.preventDefault();
    if (
      !type ||
      !designation ||
      !pn ||
      !suppliedDiameter ||
      !recoveredDiameter ||
      !dNet ||
      !varMin ||
      !varMax ||
      !minBundleSize ||
      !maxBundleSize ||
      !minSizeProg ||
      !image
    ) {
      setMsg("Please fill in all fields.");
      return;
    }

    try {
        console.log("supp",supplier)
      const formData = new FormData();
      formData.append("image", image);
      formData.append("supplier", supplier);
      formData.append("type", type);
      formData.append("designation", designation);
      formData.append("pn", pn);
      formData.append("suppliedDiameter", suppliedDiameter);
      formData.append("recoveredDiameter", recoveredDiameter);
      formData.append("dNet", dNet);
      formData.append("varMin", varMin);
      formData.append("varMax", varMax);
      formData.append("minBundleSize", minBundleSize);
      formData.append("maxBundleSize", maxBundleSize);
      formData.append("minSizeProg", minSizeProg);
      console.log("data",type);

      const response = await axios.post(
        "http://localhost:5000/shrinksleeves",
        formData,
        {
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log(response.data);
      navigate("/shrinksleeves");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="title">Add Shrink Sleeve</h1>
      <form onSubmit={saveShrinkSleeve}>
        <p className="has-text-centered has-text-danger has-text-weight-bold">
          {msg}
        </p>
        <div className="field">
          <label className="label">Supplier</label>
          <div className="control">
            <div className="select">
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <option value="">Select Supplier</option>
                <option value="DSG">DSG</option>
                <option value="TE Raychem">RAYCHEM</option>
                <option value="Mecalbi">MECALBI</option>

              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Type</label>
          <div className="control">
            <div className="select">
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="End Splice">End-splice</option>
                <option value="Parallel Splice">Parallel splices</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Designation</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Designation"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">PN</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={pn}
              onChange={(e) => setPn(e.target.value)}
              placeholder="PN"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Supplied Diameter</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={suppliedDiameter}
              onChange={(e) => setSuppliedDiameter(e.target.value)}
              placeholder="Supplied Diameter"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Recovered Diameter</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={recoveredDiameter}
              onChange={(e) => setRecoveredDiameter(e.target.value)}
              placeholder="Recovered Diameter"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">dNet</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={dNet}
              onChange={(e) => setDNet(e.target.value)}
              placeholder="dNet"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">VarMin</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={varMin}
              onChange={(e) => setVarMin(e.target.value)}
              placeholder="VarMin"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">VarMax</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={varMax}
              onChange={(e) => setVarMax(e.target.value)}
              placeholder="VarMax"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Min Bundle Size</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={minBundleSize}
              onChange={(e) => setMinBundleSize(e.target.value)}
              placeholder="Min Bundle Size"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Max Bundle Size</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={maxBundleSize}
              onChange={(e) => setMaxBundleSize(e.target.value)}
              placeholder="Max Bundle Size"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Min Size Prog</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={minSizeProg}
              onChange={(e) => setMinSizeProg(e.target.value)}
              placeholder="Min Size Prog"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])} // Update the image state with the selected file
            />
          </div>
        </div>
        <button type="submit" className="button is-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default FormAddShrinkSleeve;
