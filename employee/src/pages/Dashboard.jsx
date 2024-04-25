import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Logic to check if user is authenticated
    const isAuthenticated = true; // Replace this with your logic

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
