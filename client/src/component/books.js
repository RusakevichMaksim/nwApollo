import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

import { GetAllBooks } from "../api/GetAllBooks";
import { AddBook } from "../api/AddBook";
import { DeleteBooks } from "../api/DeleteBook";
import { useHistory } from "react-router-dom";

const Books = () => {
  const { push } = useHistory();

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
    <div>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => push("/subs")}
      >
        на веб сокет
      </button>

      {data.books.map((book) => {
        return (
          <div key={book.title}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <button
              onClick={() => {
                deleteBook({ variables: { id: book.id } });
              }}
            >
              deleted {book.id}
            </button>
            <hr align="left" width="400" size="3" color="#0000dd" />
          </div>
        );
      })}
      <div>
        <input
          placeholder="id"
          value={inputBook.id}
          onChange={(e) => handleChangeBookInput("id", e.target.value)}
        />
        <input
          placeholder="title"
          value={inputBook.title}
          onChange={(e) => handleChangeBookInput("title", e.target.value)}
        />
        <input
          placeholder="author"
          value={inputBook.author}
          onChange={(e) => handleChangeBookInput("author", e.target.value)}
        />
        <button
          onClick={() => {
            addBook({ variables: { onebook: inputBook } });
          }}
        >
          button
        </button>
      </div>
    </div>
  );
};

export default Books;
