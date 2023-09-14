import React from "react";
import spinImg from "../assets/img/snipper.gif";

const Spinner:React.FC = () => {
  return (
    <>
      <div className="spinner">
        <img src={spinImg} alt="" />
      </div>
    </>
  );
};

export default Spinner;
