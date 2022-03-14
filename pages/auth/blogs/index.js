import useCurrentUser from "libs/hooks/useCurrentUser";
import SessionLayout from "@/components/layouts/Session";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogIndex() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    if (currentUser) {
      fetcherWithToken(
        "https://sakko-demo-api.herokuapp.com/api/v1/user/blogs"
      ).then((json) => {
        setBlogs(json);
      });
    }
  }, [currentUser]);
  useEffect(() => {
    console.log("BLOGS", blogs);
  }, [blogs]);

  return (
    <SessionLayout>
      Blog index page
      <Link href={`/auth/blogs/new`}>
        <Button>new blog</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">title&nbsp;</TableCell>
              <TableCell align="center">body&nbsp;</TableCell>
              <TableCell align="center">Created at&nbsp;</TableCell>
              <TableCell align="center">Updated at&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>

                <TableCell component="th" scope="row">
                  <Link href={`/auth/blogs/${row.id}`}>{row.title}</Link>
                </TableCell>

                <TableCell align="center">{row.body}</TableCell>
                <TableCell align="center">{row.created_at}</TableCell>
                <TableCell align="center">{row.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SessionLayout>
  );
}
