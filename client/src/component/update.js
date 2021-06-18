import { useQuery } from "@apollo/client";
import GetBooks from "../api/GetBooks";
import { useParams } from "react-router";
const Update = (props) => {
  let { idBooks } = useParams();

  const { loading, error, data } = useQuery(GetBooks, {
    variables: { id: idBooks },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>oops...</div>;

  return (
    <div style={{ color: "white" }}>
      <p>{data.getBook.id}</p>
      <p>{data.getBook.title}</p>
      <p>{data.getBook.author}</p>
    </div>
  );
};
export default Update;
