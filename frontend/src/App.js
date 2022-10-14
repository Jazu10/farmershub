import "./App.css";
import { Header, Home, ProductDetails } from "./components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login, Register, Profile, UpdateProfile } from "./components";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ProtectedRoute from "./components/route/ProtectedRoute";

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
        </Router>
    );
}

export default App;
