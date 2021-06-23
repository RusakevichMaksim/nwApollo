import "./App.css";
import Subs from "./component/Subs";
import Books from "./component/Books";
import { Route, Switch } from "react-router-dom";
import Update from "./component/Update";
const topPadding = "20px";
function App() {
  return (
    <div
      style={{
        minHeight: `calc(100vh-${topPadding})`,
        paddingLeft: "50px",
        paddingTop: `${topPadding}`,
      }}
    >
      <Switch>
        <Route exact path="/:page?">
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
