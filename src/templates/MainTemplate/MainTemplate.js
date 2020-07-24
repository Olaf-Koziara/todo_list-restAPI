import React from "react";
import Menu from "../../components/Menu/Menu";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Menu></Menu>
      {children}
    </>
  );
};

export default MainTemplate;
