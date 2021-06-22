import "./App.css";
import Subs from "./component/subs";
import Books from "./component/books";
import { Route, Switch } from "react-router-dom";
import Update from "./component/update";
function App() {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
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
