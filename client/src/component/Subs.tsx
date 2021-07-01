import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import Button from "@material-ui/core/Button";

import COMMENTS_SUBSCRIPTION from "../api/Subscr";

const Subs = () => {
  const { push } = useHistory();

  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);
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
