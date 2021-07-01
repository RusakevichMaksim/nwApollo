import { useQuery, useMutation } from "@apollo/client";
import GET_BOOKS from "../api/GetBooks";
import { useParams } from "react-router";
import UPDATE_BOOK from "../api/UpdateBook";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { BookType } from "./BooksComponent/type";
type PropsType = {};
const Update: React.FC<PropsType> = (props) => {
  let history = useHistory();
  let { idBooks } = useParams<{ idBooks: string }>();
  const newTitle = useRef<HTMLInputElement | any>(null);
  const newAuthor = useRef<HTMLInputElement | any>(null);

  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { id: idBooks },
    fetchPolicy: "standby",
  });

  const [updateBook] = useMutation(UPDATE_BOOK, {
    // refetchQueries: [{ query: GET_BOOKS, variables: { id: idBooks } }],
    update(cache) {
      console.log("data");
      cache.writeQuery({
        query: UPDATE_BOOK,
        variables: { id: idBooks },
        data: {
          updateBook: {
            id: idBooks,
            title: newTitle.current.value,
            author: newAuthor.current.value,
          },
        },
      });
    },
    // update(cache, { data: { updateBook } }) {
    //   cache.modify({
    //     fields: {
    //       todos(existingTodos = []) {
    //         console.log("data");
    //         const newTodoRef = cache.writeFragment({
    //           data: updateBook,
    //           fragment: GET_BOOKS,
    //         });
    //         return [...existingTodos, newTodoRef];
    //       },
    //     },
    //   });
    // },
  });

  // if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>oops...</div>;
  return (
    <div className="update__card-wrapper">
      <p className="text__backgound">Concat field: {data.getBook.Concat}</p>
      <p className="text__backgound">id: {data.getBook.id}</p>
      <p className="text__backgound">title: {data.getBook.title}</p>
      <p className="text__backgound">author: {data.getBook.author}</p>{" "}
      {data.getBook.autorBookList && data.getBook.autorBookList.length !== 0 ? (
        <div style={{ border: "1px solid #e2d1d1" }} className="mb-30 mt-30">
          <p className="text__backgound">
            <span style={{ fontWeight: "bold", paddingRight: "5px" }}>
              more books this author:
            </span>
            {data.getBook.author}
          </p>
          {data.getBook.autorBookList.map((e: any, index: number) => {
            return (
              <p key={index + "more"} className="text__backgound">
                book title: {e.title}
              </p>
            );
          })}
        </div>
      ) : (
        ""
      )}
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
