import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { BookType } from "./type";
type inputBookType = {
  inputBook: BookType;
};
type handleChangeBookInputType = {
  handleChangeBookInput: (name: string, value: string) => void;
};
type addBookType = {
  addBook: () => void;
};
type PropsType = inputBookType & handleChangeBookInputType & addBookType;

const AddButton: React.FC<PropsType> = ({
  handleChangeBookInput,
  inputBook,
  addBook,
}) => {
  return (
    <div>
      <TextField
        placeholder="id"
        value={inputBook.id}
        onChange={(e) => {
          handleChangeBookInput("id", e.target.value);
        }}
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
        className="ml-10"
        color="primary"
        onClick={() => {
          //@ts-ignore
          addBook({ variables: { onebook: inputBook } });
        }}
      >
        add item
      </Button>
    </div>
  );
};

export default AddButton;
