import { useQuery, useMutation } from "@apollo/client";
import GET_BOOKS from "../api/GetBooks";
import { useParams } from "react-router";
import UPDATE_BOOK from "../api/UpdateBook";
import { useRef } from "react";
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

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>oops...</div>;
  console.log(data);
  return (
    <div className="update__card-wrapper">
      <p className="text__backgound">Concat field: {data.getBook.Concat}</p>
      <p className="text__backgound">id: {data.getBook.id}</p>
      <p className="text__backgound">title: {data.getBook.title}</p>
      <p className="text__backgound">author: {data.getBook.author}</p>{" "}
      <div style={{ border: "1px solid #e2d1d1" }} className="mb-30 mt-30">
        <p className="text__backgound">
          <span style={{ fontWeight: "500", paddingRight: "5px" }}>
            more books this author:
          </span>
          {data.getBook.author}
        </p>
        {data.getBook.autorBookList.map((e, index) => {
          return (
            <p key={index + "more"} className="text__backgound">
              book title: {e.title}
            </p>
          );
        })}
      </div>
      <div className="update__input-wrapper ">
        <input
          className="text__backgound update__input"
          ref={newTitle}
          defaultValue={data.getBook.title}
        />
        <input
          className="text__backgound update__input"
          ref={newAuthor}
          defaultValue={data.getBook.author}
        />
        <button
          className="update__button-general"
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
    </div>
  );
};
export default Update;
