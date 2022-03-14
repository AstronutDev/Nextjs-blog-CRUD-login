import DefaultLayout from "@/components/layouts/Default";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../libs/store/session";
import { useRouter } from "next/dist/client/router";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("saklism+demo1@gmail.com");
  const [password, setPassword] = useState("12341234");

  const handleLogin = async () => {
    const url = "https://sakko-demo-api.herokuapp.com/api/v1/user/sign_in";
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const json = await response.json();
    dispatch(setToken(json.user.auth_jwt));
    router.replace("/auth/profile");
  };

  return (
    <DefaultLayout>
      <div>
        <div>Email</div>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <div>password</div>
        <input
          type="password"
          name="password"
          value={email}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <div>
          <button onClick={handleLogin}>login</button>
        </div>
      </div>
    </DefaultLayout>
  );
}
