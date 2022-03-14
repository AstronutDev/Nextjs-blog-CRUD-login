import useCurrentUser from "libs/hooks/useCurrentUser";
import SessionLayout from "@/components/layouts/Session";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { useRouter } from "next/dist/client/router";
export default function BlogIndex() {
  const router = useRouter();
  const [blog, setBlog] = useState({ title: "", body: "" });
  const { fetcherWithToken, currentUser } = useCurrentUser();

  const handleOnChange = (e, type) => {
    if (type === "title") {
      setBlog({ ...blog, title: e.target.value });
    } else if (type === "body") {
      setBlog({ ...blog, body: e.target.value });
    }
  };

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
      Blog edit page
      <div>
        title <br />
        <input
          type="text"
          value={blog.title}
          onChange={(e) => {
            handleOnChange(e, "title");
          }}
        ></input>
      </div>
      <div>
        body <br />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={blog.body}
          onChange={(e) => {
            handleOnChange(e, "body");
          }}
        ></textarea>
        <Button
          onClick={() => {
            const url = `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${blog.id}`;
            fetcherWithToken(url, {
              method: "PUT",
              body: JSON.stringify({
                blog: {
                  title: blog.title,
                  body: blog.body,
                },
              }),
            }).then((json) => {
              router.push(`/auth/blogs/${json.id}`);
            });
          }}
        >
          save
        </Button>
      </div>
    </SessionLayout>
  );
}
