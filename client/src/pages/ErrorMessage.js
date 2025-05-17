import React, { useEffect, useState } from "react";

const ErrorMessage = ({ message, clearError, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (clearError) clearError();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, clearError, duration]);

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
