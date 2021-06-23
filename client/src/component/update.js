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
    fetchPolicy: "cache-first",
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { id: idBooks } }],
  });

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>oops...</div>;
  return (
    <div>
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
          style={{
            backgroundColor: "red",
            color: "white",
            height: "30px",
            marginTop: "20px",
          }}
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
        <button
          style={{ marginTop: "20px", height: "30px" }}
          onClick={() => history.goBack()}
        >
          Back
        </button>
      </div>
      {console.log(data.getBook)}
      <p>Concat field: {data.getBook.Concat}</p>
      <p>id: {data.getBook.id}</p>
      <p>title: {data.getBook.title}</p>
      <p>author: {data.getBook.author}</p>
    </div>
  );
};
export default Update;
