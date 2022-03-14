import useCurrentUser from "libs/hooks/useCurrentUser";
import SessionLayout from "@/components/layouts/Session";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

import { useRouter } from "next/dist/client/router";
export default function BlogIndex() {
  const router = useRouter();
  const [blog, setBlog] = useState({});
  const { fetcherWithToken, currentUser } = useCurrentUser();
  useEffect(() => {
    if (currentUser) {
      const url = `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${router.query.id}`;
      fetcherWithToken(url).then((json) => {
        console.log(json);
        setBlog(json);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("blog>", blog);
  }, [blog]);
  return (
    <SessionLayout>
      Blog show page
      <Link href={`/auth/blogs/${blog.id}/edit`}>
        <Button> edit </Button>
      </Link>
      <Button
        color="error"
        onClick={(e) => {
          const url = `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${blog.id}`;
          fetcherWithToken(url, { method: "DELETE" }).then((json) => {
            console.log(json);
            router.push(`/auth/blogs`);
          });
        }}
      >
        {" "}
        Delete ID: {blog.id}{" "}
      </Button>
      <h1>
        {blog.id} {blog.title}
      </h1>
      <p>{blog.body}</p>
    </SessionLayout>
  );
}
