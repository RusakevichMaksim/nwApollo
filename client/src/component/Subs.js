import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import COMMENTS_SUBSCRIPTION from "../api/Subscr";
import Button from "@material-ui/core/Button";

const Subs = () => {
  const { push } = useHistory();

  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => push("/")}>
        go back
      </Button>
      <h4 className="text__Backgound">
        New comment: {!loading && data.messageCreated.content}
      </h4>
    </div>
  );
};

export default Subs;
