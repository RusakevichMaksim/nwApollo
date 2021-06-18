import { useQuery, useMutation } from "@apollo/client";
import GetBooks from "../api/GetBooks";
import { useParams } from "react-router";
import UpdateBook from "../api/UpdateBook";
import { useRef } from "react";
const Update = (props) => {
  let { idBooks } = useParams();

  const { loading, error, data } = useQuery(GetBooks, {
    variables: { id: idBooks },
  });
  const newTitle = useRef();
  const newAuthor = useRef();

  const [updateBook, { dataMutation }] = useMutation(UpdateBook, {
    refetchQueries: [{ query: GetBooks, variables: { id: idBooks } }],
  });
  //   const [updateBook, { dataMutation }] = useMutation(UpdateBook);
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
      </div>

      <p>{data.getBook.id}</p>
      <p>{data.getBook.title}</p>
      <p>{data.getBook.author}</p>
    </div>
  );
};
export default Update;
