import Button from "@material-ui/core/Button";

const BooksList = ({ books, deleteBook, push }) => {
  return (
    <div className="book__card-wrapper ">
      {books.map((book) => {
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
                // client.cache.evict({ id: book.id });
                // console.log(client.cache.data.data);
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
  );
};

export default BooksList;
