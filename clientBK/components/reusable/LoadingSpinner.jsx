
  
/** @format */

import React from "react";
import styles from "./Loading.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loading}>
     <span className={styles.icon}></span>
    </div>
  );
};
export default LoadingSpinner