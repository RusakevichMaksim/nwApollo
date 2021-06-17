import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

import { GetAllBooks } from "../api/GetAllBooks";
import { AddBook } from "../api/AddBook";
import { DeleteBooks } from "../api/DeleteBook";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    color: "black",
  },
  inp: {
    "& > *": {
      mcolor: "white",
      width: "25ch",
    },
  },
});
const Books = () => {
  const { push } = useHistory();
  const classes = useStyles();

  const { loading, error, data } = useQuery(GetAllBooks);
  const [inputBook, setInputBook] = useState({ id: "", title: "", author: "" });
  const handleChangeBookInput = (name, value) => {
    setInputBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [addBook, { dataMutation }] = useMutation(AddBook, {
    refetchQueries: [{ query: GetAllBooks }],
  });
  const [deleteBook, { dataDeleteMutation }] = useMutation(DeleteBooks, {
    refetchQueries: [{ query: GetAllBooks }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => push("/subs")}>
        на веб сокет
      </Button>
      {data.books.map((book) => {
        return (
          <div key={book.title}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                deleteBook({ variables: { id: book.id } });
              }}
            >
              deleted {book.id}
            </Button>
            <hr align="left" width="400" size="3" color="#0000dd" />
          </div>
        );
      })}
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
