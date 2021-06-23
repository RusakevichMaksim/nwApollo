import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import COMMENTS_SUBSCRIPTION from "../api/SUBSCR";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    // backgroundColor: "black",
    // color: "white",
  },
});
const Subs = () => {
  const { push } = useHistory();
  const classes = useStyles();

  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => push("/")}>
        go back
      </Button>
      <h4>New comment: {!loading && data.messageCreated.content}</h4>
    </div>
  );
};

export default Subs;
