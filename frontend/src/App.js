import "./App.css";
import { Header, Home, ProductDetails } from "./components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
    return (
        <Router>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" exact component={ProductDetails} />
        </Router>
    );
}

export default App;
