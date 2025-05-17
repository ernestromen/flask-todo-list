import React, { useEffect, useState } from "react";

const ErrorMessage = ({ message }) => {
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
      className="alert alert-danger text-center"
      style={{ maxWidth: "400px", margin: "20px auto" }}
    >
      {(() => {
        if (typeof message === "string") return message;
        if (message && typeof message === "object" && message.error)
          return message.error;
        return "An error occurred";
      })()}
    </div>
  );
};

export default ErrorMessage;
