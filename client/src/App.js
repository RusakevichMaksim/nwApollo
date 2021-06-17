import logo from "./logo.svg";
import "./App.css";
import Subs from "./component/subs";
import Books from "./component/books";
import { Route, Switch } from "react-router-dom";
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
      </Switch>
    </div>
  );
}

export default App;
