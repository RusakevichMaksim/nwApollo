import { useQuery, useMutation } from "@apollo/client";
import GET_BOOKS from "../api/GetBooks";
import { useParams } from "react-router";
import UPDATE_BOOK from "../api/UpdateBook";
import { useRef } from "react";
import client from "../utils/client";
import { GET_ALL_BOOKS } from "../api/GetAllBooks";
import { useHistory } from "react-router-dom";

const Update = (props) => {
  let history = useHistory();
  let { idBooks } = useParams();
  const newTitle = useRef();
  const newAuthor = useRef();

  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { id: idBooks },
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { id: idBooks } }],
  });

  // const test = client.readQuery({
  //   query: GET_ALL_BOOKS,
  //   variables: {
  //     // Provide any required variables here
  //     // id: 1,
  //   },
  // });

  // console.log(test, client);

  // return <div>11</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>oops...</div>;

  return (
    <div style={{ color: "white", padding: "50px 50px 0px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          paddingBottom: "50px",
        }}
      >
        <input ref={newTitle} defaultValue={data.getBook.title} />
        <input ref={newAuthor} defaultValue={data.getBook.author} />
        <button
          style={{ backgroundColor: "red", color: "white", height: "50px" }}
          onClick={() => {
            updateBook({
              variables: {
                book: {
                  id: idBooks,
                  title: newTitle.current.value,
                  author: newAuthor.current.value,
                },
              },
            });
          }}
        >
          Update
        </button>
        <button style={{ marginTop: "50px" }} onClick={() => history.goBack()}>
          Back
        </button>
      </div>
      {console.log(data.getBook)}
      <p>{data.getBook.id}</p>
      <p>{data.getBook.title}</p>
      <p>{data.getBook.author}</p>
    </div>
  );
};
export default Update;
