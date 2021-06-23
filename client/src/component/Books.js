import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

import { GET_ALL_BOOKS } from "../api/GetAllBooks";
import { ADD_BOOK } from "../api/AddBook";
import { DELETE_BOOKS } from "../api/DeleteBook";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({});
const Books = () => {
  const { push } = useHistory();
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const [inputBook, setInputBook] = useState({ id: "", title: "", author: "" });
  const handleChangeBookInput = (name, value) => {
    setInputBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL_BOOKS }],
  });
  const [deleteBook] = useMutation(DELETE_BOOKS, {
    refetchQueries: [{ query: GET_ALL_BOOKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "10px" }}
        onClick={() => push("/subs")}
      >
        push to websocket
      </Button>
      <div className="book__card-wrapper ">
        {data.books.map((book) => {
          return (
            <div key={book.title} className="book__card">
              <p className="text__Backgound">{book.title}</p>
              <p className="text__Backgound">{book.author}</p>
              <Button
                variant="contained"
                color="primary"
                className="mr-10"
                onClick={() => {
                  deleteBook({ variables: { id: book.id } });
                }}
              >
                deleted {book.id}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => push(`/update/${book.id}`)}
              >
                update
              </Button>
            </div>
          );
        })}
      </div>
      <div className={classes.inp}>
        <TextField
          placeholder="id"
          value={inputBook.id}
          onChange={(e) => handleChangeBookInput("id", e.target.value)}
        />
        <TextField
          placeholder="title"
          value={inputBook.title}
          onChange={(e) => handleChangeBookInput("title", e.target.value)}
        />
        <TextField
          placeholder="author"
          value={inputBook.author}
          onChange={(e) => handleChangeBookInput("author", e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addBook({ variables: { onebook: inputBook } });
          }}
        >
          add item
        </Button>
      </div>
    </div>
  );
};

export default Books;
