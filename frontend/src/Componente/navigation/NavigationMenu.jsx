import React from "react";
import "./NavigationMenu.css";
import { AiOutlineFileText, AiOutlineReconciliation } from "react-icons/ai";
export const NavigationMenu = () => {
  return (
    <div className="navigation-wrapper">
      <div className="navigation-container">
        <h1>Phonoaudio</h1>
        <div className="navigation-buttons-container">
          <div className="navigation-buttons">
            <AiOutlineFileText size={22} />
            <a href="/Person">Exames</a>
          </div>
          <div className="navigation-buttons">
            <AiOutlineReconciliation size={22} />
            <a href="/">Registro</a>
          </div>
        </div>
      </div>
    </div>
  );
};
