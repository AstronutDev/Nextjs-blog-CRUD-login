import useCurrentUser from "libs/hooks/useCurrentUser";
import SessionLayout from "@/components/layouts/Session";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { useRouter } from "next/dist/client/router";
export default function NewBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { fetcherWithToken, currentUser } = useCurrentUser();

  const handleOnChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleOnsave = () => {
    const url = `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs`;
    fetcherWithToken(url, {
      method: "POST",
      body: JSON.stringify({
        blog: {
          title,
          body,
        },
      }),
    }).then((json) => {
      console.log();
      router.push(`/auth/blogs/${json.id}`);
    });
  };

  useEffect(() => {
    if (currentUser) {
    }
  }, []);

  return (
    <SessionLayout>
      <div>
        title
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => {
            handleOnChange(e, setTitle);
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
          value={body}
          onChange={(e) => {
            handleOnChange(e, setBody);
          }}
        ></textarea>
        <div onClick={handleOnsave}>
          <Button>create</Button>
        </div>
      </div>
    </SessionLayout>
  );
}
