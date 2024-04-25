import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getMe action to fetch user data
    dispatch(getMe());
  }, [dispatch]);

  console.log("user", user?.id);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.firstName}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
