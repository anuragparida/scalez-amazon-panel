import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

// Auth Components
import Login from "./pages/login";
import App from "./pages/App";

export default function Router() {
  const tokenDate = Date.parse(Cookies.get("tokenDate"));
  if (
    Date.parse(new Date()) - tokenDate > 2 * 60 * 60 * 1000 ||
    tokenDate === undefined ||
    tokenDate === null ||
    isNaN(tokenDate)
  ) {
    Cookies.remove("jwt");
    Cookies.remove("tokenDate");
  }

  const token = Cookies.get("jwt");
  let loggedIn = false;

  if (token) {
    loggedIn = true;
  }
  return (
    <BrowserRouter>
      <Switch>
        {loggedIn ? (
          <>
            <Route path="/analysis" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}