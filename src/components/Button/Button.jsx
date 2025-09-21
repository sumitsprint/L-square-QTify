// src/components/Button/Button.jsx
import React from "react";
import styles from "./Button.module.css";

/**
 * Reusable Button component
 * Props:
 *  - children: button text (required)
 *  - onClick: click handler (optional)
 *  - className: extra className to extend styles (optional)
 */
export default function Button({ children, onClick, className = "" }) {
  return (
    <button className={`${styles.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}



/**
 * 
 * function button({children, onclick}){
 * <button>{children}</button>
 * 
 * }
 */