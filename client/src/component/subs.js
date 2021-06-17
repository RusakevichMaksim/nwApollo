import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import COMMENTS_SUBSCRIPTION from "../api/SUBSCR";
const Subs = () => {
  const { push } = useHistory();

  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);
  return (
    <div>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => push("/")}
      >
        На главную
      </button>
      <h4>New comment: {!loading && data.messageCreated.content}</h4>
    </div>
  );
};

export default Subs;
