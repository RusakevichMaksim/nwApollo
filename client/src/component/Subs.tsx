import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import Button from "@material-ui/core/Button";

import COMMENTS_SUBSCRIPTION from "../api/Subscr";

const Subs = () => {
  const { push } = useHistory();

  const { data, loading, error } = useSubscription(COMMENTS_SUBSCRIPTION);
  console.log(data);
  if (error) return <div>oops</div>;

  if (loading) return <div>loading...</div>;
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => push("/")}>
        go back
      </Button>
      <h4 className="text__backgound">
        New comment: {!loading && data.messageCreated.content}
      </h4>
    </div>
  );
};

export default Subs;
