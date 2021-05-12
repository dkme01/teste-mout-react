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
        <Route
          exact
          path="/"
          render={() => <Redirect to="/test-mout-react" />}
        />
        <Route exact path="/test-mout-react" render={() => <Countries />} />
        <Route path="*" render={() => <Redirect to="/test-mout-react" />} />
      </Switch>
    </Router>
  );
}
