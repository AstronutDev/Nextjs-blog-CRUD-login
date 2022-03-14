import styles from "./Session.module.css";
import SessionTopbar from "@/components/layouts/reusable/SessionTopbar";
import useCurrentUser from "libs/hooks/useCurrentUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "libs/store/session";
import { token, currentUser } from "../../libs/hooks/useCurrentUser";

export default function SessionLayout({ children }) {
  const { token } = useCurrentUser();
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(setToken(jwt));
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser", currentUser);
    }
  }, [currentUser]);

  return (
    <div>
      <SessionTopbar></SessionTopbar>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
