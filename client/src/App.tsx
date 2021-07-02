import "./App.css";
import Subs from "./component/Subs";
import Books from "./component/Books";
import { Route, Switch } from "react-router-dom";
import Update from "./component/Update";
import Auth from "./component/Auth";
const topPadding = "20px";
function App() {
  // let auth1;
  // if (!auth1) {
  //   return <Auth />;
  // }

  return (
    <div
      style={{
        minHeight: `calc(100vh-${topPadding})`,
        paddingLeft: "50px",
        paddingTop: `${topPadding}`,
      }}
    >
      <Switch>
        <Route exact path="/">
          <Books />
        </Route>
        <Route path="/subs/">
          <Subs />
        </Route>
        <Route path="/update/:idBooks?">
          <Update />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
