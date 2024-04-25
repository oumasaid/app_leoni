import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddShrinkSleeve from "../components/FormAddShrinkSleeve";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddShrinkSleeve = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/"); // Redirige vers la page de connexion en cas d'erreur
        }
    }, [isError, navigate]);
    
    return (
        <Layout>
            <FormAddShrinkSleeve />
        </Layout>
    );
};

export default AddShrinkSleeve;
