import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FormEditShrinkSleeve = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [image ,setImage]=useState("");
  const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token available");
    }

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"

      },
    };


  useEffect(() => {
    const fetchShrinkSleeve = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/shrinksleeves/${id}`
        ,config);
        const shrinkSleeveData = response.data;
        setType(shrinkSleeveData.type);
        setDesignation(shrinkSleeveData.designation);
        setPn(shrinkSleeveData.pn);
        setSuppliedDiameter(shrinkSleeveData.suppliedDiameter);
        setRecoveredDiameter(shrinkSleeveData.recoveredDiameter);
        setDNet(shrinkSleeveData.dNet);
        setVarMin(shrinkSleeveData.varMin);
        setVarMax(shrinkSleeveData.varMax);
        setMinBundleSize(shrinkSleeveData.minBundleSize);
        setMaxBundleSize(shrinkSleeveData.maxBundleSize);
        setMinSizeProg(shrinkSleeveData.minSizeProg);
        // setImage(shrinkSleeveData.image);
        console.log("shrinkdata",shrinkSleeveData)
      } catch (error) {
        console.error("Error fetching shrink sleeve data:", error);
      }
    };

    fetchShrinkSleeve();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
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
      formData.append("image", image); // Append image to form data
      console.log("imm",image)
      
      const response=await axios.patch(`http://localhost:5000/shrinksleeves/${id}`, formData, config);
      console.log("response",response.data)
      navigate("/ShrinkSleeves");
    } catch (error) {
      console.error("Error updating shrink sleeve:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };
 
  return (
    <div className="form-container">
      <h1 className="title">Edit Shrink Sleeve</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Type:</label>
          <input
            type="text"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Designation:</label>
          <input
            type="text"
            className="input"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">PN:</label>
          <input
            type="text"
            className="input"
            value={pn}
            onChange={(e) => setPn(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Supplied Diameter:</label>
          <input
            type="text"
            className="input"
            value={suppliedDiameter}
            onChange={(e) => setSuppliedDiameter(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Recovered Diameter:</label>
          <input
            type="text"
            className="input"
            value={recoveredDiameter}
            onChange={(e) => setRecoveredDiameter(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">dNet:</label>
          <input
            type="text"
            className="input"
            value={dNet}
            onChange={(e) => setDNet(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">varMin:</label>
          //
          <input
            type="text"
            className="input"
            value={varMin}
            onChange={(e) => setVarMin(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">varMax:</label>
          <input
            type="text"
            className="input"
            value={varMax}
            onChange={(e) => setVarMax(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">minBundleSize:</label>
          <input
            type="text"
            className="input"
            value={minBundleSize}
            onChange={(e) => setMinBundleSize(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">maxBundleSize:</label>
          <input
            type="text"
            className="input"
            value={maxBundleSize}
            onChange={(e) => setMaxBundleSize(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">minSizeProg:</label>
          <input
            type="text"
            className="input"
            value={minSizeProg}
            onChange={(e) => setMinSizeProg(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Image:</label>
          <input
            type="file"
            className="input"
            name="image"
            // accept="image/*" // Accept only image files
            onChange={handleImageChange} // Handle image selection
          />
        </div>
        <div className="field">
          <button type="submit" className="button is-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditShrinkSleeve;