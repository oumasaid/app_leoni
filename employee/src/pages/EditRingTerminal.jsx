import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import FormEditRingTerminal from "../components/FormEditRingTerminal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditRingTerminal = () => {
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
            <FormEditRingTerminal />
        </Layout>
    );
};

export default EditRingTerminal;
