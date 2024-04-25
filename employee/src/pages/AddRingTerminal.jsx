import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddRingTerminal from "../components/FormAddRingTerminal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddRingTerminal = () => {
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
            <FormAddRingTerminal />
        </Layout>
    );
};

export default AddRingTerminal;
