import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import ControllButton from "./BooksComponent/controllButton";
import AddButton from "./BooksComponent/addButton";
// import BooksList from "./BooksComponent/booksList";
import { GET_ALL_BOOKS } from "../api/GetAllBooks";
import { ADD_BOOK } from "../api/AddBook";
import { DELETE_BOOKS } from "../api/DeleteBook";
import { BooksList } from "./BooksComponent/booksList";
const Books = () => {
  const { push } = useHistory();
  const [offset, setOffset] = useState(0);
  const [limitNew, setLimitNew] = useState(5);

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_BOOKS, {
    variables: {
      offset: offset,
      limit: limitNew,
    },
  });

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      {
        query: GET_ALL_BOOKS,
        variables: {
          offset: offset,
          limit: limitNew,
        },
      },
    ],
  });
  const [deleteBook] = useMutation(DELETE_BOOKS, {
    refetchQueries: [
      {
        query: GET_ALL_BOOKS,
        variables: {
          offset: offset,
          limit: limitNew,
        },
      },
    ],
  });

  const hendleLimitNewChange = (value: any): void => {
    setLimitNew(parseInt(value, 10));
    fetchMore({
      variables: {
        offset: offset,
        limit: parseInt(value, 10),
      },
    });
  };

  const hendleOffsetChange = (value: any) => {
    // fix, back click -value
    if (value < 0) {
      value = 0;
    }
    setOffset(value);
    fetchMore({
      variables: {
        offset: value,
        limit: limitNew,
      },
    });
    // для постепенного обновления
    // fetchMore({
    //   variables: {
    //     offset: value,
    //     limit: limit,
    //   },
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) return prev;
    //     return Object.assign({}, prev, {
    //       books: [...prev.books, ...fetchMoreResult.books],
    //     });
    //   },
    // });
  };

  const [inputBook, setInputBook] = useState({ id: "", title: "", author: "" });
  const handleChangeBookInput = (name: string, value: string) => {
    setInputBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className="mb-10"
        onClick={() => push("/subs")}
      >
        go to websocket
      </Button>
      <BooksList books={data.books} deleteBook={deleteBook} />
      <ControllButton
        hendleOffsetChange={hendleOffsetChange}
        hendleLimitNewChange={hendleLimitNewChange}
        offset={offset}
        limitNew={limitNew}
        booksLength={data.books.length}
      />
      <AddButton
        handleChangeBookInput={handleChangeBookInput}
        inputBook={inputBook}
        addBook={addBook}
      />
    </div>
  );
};

export default Books;
