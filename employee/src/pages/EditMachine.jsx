import React, { useEffect } from "react";
import Layout from "../pages/Layout";
import FormEditMachine from "../components/FormEditMachine"; // Import the FormEditMachine component
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditMachine = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <FormEditMachine />
        </Layout>
    );
};

export default EditMachine;