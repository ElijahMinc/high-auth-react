import { Outlet } from "react-router-dom";

import styles from "./auth-styles.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles.auth}>
      <div className={styles.auth__wrapper}>
        <h1 className={styles.title}>Qenqode</h1>
        <Outlet />
      </div>
    </div>
  );
};
