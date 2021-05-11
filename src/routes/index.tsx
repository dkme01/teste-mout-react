import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Countries } from "../pages/Countries";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/countries" />} />
        <Route exact path="/countries" render={() => <Countries />} />
        <Route path="*" render={() => <Redirect to="/countries" />} />
      </Switch>
    </Router>
  );
}
