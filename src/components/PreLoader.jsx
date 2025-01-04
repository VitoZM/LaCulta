import React, { useEffect, useState } from "react";

const PreLoader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <div>
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PreLoader;
