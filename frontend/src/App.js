import "./App.css";
import { Header, Home, ProductDetails } from "./components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ProtectedRoute from "./components/route/ProtectedRoute";
import {
    Login,
    Register,
    Profile,
    UpdateProfile,
    UpdatePassword,
    ForgotPassword,
    NewPassword,
} from "./components";

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Router>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" exact component={ProductDetails} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <ProtectedRoute path="/me" exact component={Profile} />
            <ProtectedRoute path="/me/update" exact component={UpdateProfile} />
            <ProtectedRoute
                path="/password/update"
                exact
                component={UpdatePassword}
            />
            <Route path="/password/forgot" exact component={ForgotPassword} />
            <Route
                path="/password/reset/:token"
                exact
                component={NewPassword}
            />
        </Router>
    );
}

export default App;
