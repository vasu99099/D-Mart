import React from "react";

const Loading = () => {
  return (
    <div style={{ minHeight: "70vh" }}>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
