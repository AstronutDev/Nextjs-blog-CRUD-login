import SessionLayout from "@/components/layouts/Session";
import useCurrentUser from "libs/hooks/useCurrentUser";
import { useEffect, useState } from "react";
export default function Profile() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [blog, setBlog] = useState();
  useEffect(() => {
    if (currentUser) {
      const url = "https://sakko-demo-api.herokuapp.com/api/v1/user/blogs";
      fetcherWithToken(url).then((json) => {
        console.log("json", json);
        setBlog(JSON.stringify(json));
      });
    }
  }, [currentUser]);

  return <SessionLayout>{blog}</SessionLayout>;
}
