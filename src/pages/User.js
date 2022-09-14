import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { allUsersRequest } from "../api";
import { useAuth } from "../hooks";

import styles from "../styles/user.module.css";

function User() {
  const [users, setUsers] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await allUsersRequest();
    if (res.success) {
      setUsers(res.data.usersList);
    }
  };
  if (auth.user == null) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.container}>
      {users.map((user, index) => {
        return (
          <div className={styles.userWrapper} key={index}>
            <img src="./assets/profile.png" width="90" height="90" />
            <div className={styles.userDetails}>
              <p>Name : {user.name}</p>
              <p>Username : {user.username}</p>
              <p>Email : {user.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default User;
