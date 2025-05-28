import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
} from "../features/users/userSlice";

const DeleteButton = ({user}) => {
  const dispatch = useDispatch();
  const handleDeletion = (id) => {
    
    dispatch(deleteUser(id));
  };
  const {
    error: userError,
    success: userSuccess,
    users,
    loading,
  } = useSelector((state) => state.user);
  const { error: authError } = useSelector((state) => state.auth);

  return (
    <button className="btn btn-danger" onClick={() => handleDeletion(user.id)}>
      Delete
    </button>
  );
};

export default DeleteButton;
