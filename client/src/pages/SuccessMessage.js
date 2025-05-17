import React, { useEffect, useState } from "react";

const SuccessMessage = ({ message, clearSuccess, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (clearSuccess) clearSuccess();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, clearSuccess, duration]);

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
