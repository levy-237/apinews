import React from "react";

export default function Header({ german, setGerman }) {
  return (
    <>
      <h1 className="header">News Search</h1>
      <p onClick={() => setGerman(!german)} className="language">
        Lang: {german ? "German" : "English"}
      </p>
    </>
  );
}
