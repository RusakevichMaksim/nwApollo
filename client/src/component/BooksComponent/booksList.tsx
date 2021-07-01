import Button from "@material-ui/core/Button";
import React from "react";
import { BookType } from "./type";
import { useHistory } from "react-router";

type BookTypes = {
  books: [BookType];
};
type deleteBookType = {
  deleteBook: () => void;
};

type PropsType = BookTypes & deleteBookType;

const BooksListMemo: React.FC<PropsType> = ({ books, deleteBook }) => {
  const { push } = useHistory();

  return (
    <div className="book__card-wrapper ">
      {books.map((book, index) => {
        return (
          <div key={book.title + book.id + index} className="book__card">
            <p className="text__backgound">Title: {book.title}</p>
            <p className="text__backgound">Author: {book.author}</p>
            <Button
              variant="contained"
              color="primary"
              className="mr-10"
              onClick={() => {
                //@ts-ignore
                deleteBook({ variables: { id: book.id } });
              }}
            >
              deleted {book.id}
            </Button>
            <Button
              variant="contained"
              color="primary"
              //@ts-ignore
              onClick={() => push(`/update/${book.id}`)}
            >
              update
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export const BooksList = React.memo(BooksListMemo);
