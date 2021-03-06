import Button from "@material-ui/core/Button";

type PropsType = {
  hendleOffsetChange: (value: number) => void;
  hendleLimitNewChange: (value: string) => void;
  offset: number;
  limitNew: number;
  booksLength: number;
};

const ControllButton: React.FC<PropsType> = ({
  hendleOffsetChange,
  hendleLimitNewChange,
  offset,
  limitNew,
  booksLength,
}) => {
  return (
    <div className="mt-10 mb-10">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          hendleOffsetChange(offset - limitNew);
        }}
        disabled={offset === 0 ? true : false}
      >
        back page
      </Button>
      <Button
        className="ml-10"
        variant="contained"
        color="primary"
        onClick={() => {
          hendleOffsetChange(offset + limitNew);
        }}
        disabled={booksLength === 0 ? true : false}
      >
        next page
      </Button>
      <select
        onChange={(e) => {
          hendleLimitNewChange(e.target.value);
        }}
        value={limitNew}
        className="book__select"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  );
};

export default ControllButton;
