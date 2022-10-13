import "./App.css";
import { Header, Home, ProductDetails } from "./components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login, Register } from "./components";
function App() {
    return (
        <Router>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" exact component={ProductDetails} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
        </Router>
    );
}

export default App;
