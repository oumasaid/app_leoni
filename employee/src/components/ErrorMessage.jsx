import React from "react";

const ErrorMessage = ({ message }) => {
    return message ? <p className="has-text-centered has-text-danger has-text-weight-bold">{message}</p> : null;
};

export default ErrorMessage;
