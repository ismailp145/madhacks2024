import React from "react";

const DisplayPage = () => {
  const query = new URLSearchParams(window.location.search);
  const title = query.get("title");
  const content = query.get("content");

  return (
    <div className="display-page">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default DisplayPage;
