import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";

function NavBar() {
  const auth = useAuth();
  return (
    <>
      <nav className={styles.navBar}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.logo}>
            <img src="twitter.gif" alt="twitter icon" width="40" height="40" />
            <span style={{ marginLeft: "10px" }}>Twitter</span>
          </div>
        </Link>
        <ul className={styles.menuItems}>
          {auth.user == null ? (
            <>
              <li>
                <Link className={styles.menuItem} to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className={styles.menuItem} to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={styles.menuItem}>
                  Tweets
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  className={styles.menuItem}
                  style={{ marginLeft: "0%" }}
                >
                  All Users
                </Link>
              </li>
              <li className={styles.menuItem} onClick={() => auth.logout()}>
                {auth.user != null ? "Logout" : ""}
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
