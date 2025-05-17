import React, { useEffect, useState } from "react";

const SuccessMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div
      className="alert alert-success text-center"
      style={{ maxWidth: "400px", margin: "20px auto" }}
    >
      {message}
    </div>
  );
};

export default SuccessMessage;
