import "./App.css";
import { Header, Home, ProductDetails } from "./components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect } from "react";
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
    Cart,
    Shipping,
    ConfirmOrder,
    Payment,
    OrderSuccess,
    ListOrders,
    OrderDetails,
    Dashboard,
    ProductList,
    NewProduct,
    UpdateProduct,
    OrdersList,
    ProcessOrder,
    UsersList,
    UpdateUser,
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
            <Route path="/cart" exact component={Cart} />
            <ProtectedRoute path="/shipping" exact component={Shipping} />
            <ProtectedRoute path="/confirm" exact component={ConfirmOrder} />
            <ProtectedRoute path="/payment" exact component={Payment} />
            <ProtectedRoute path="/success" exact component={OrderSuccess} />
            <ProtectedRoute path="/orders/me" exact component={ListOrders} />
            <ProtectedRoute path="/order/:id" exact component={OrderDetails} />

            <ProtectedRoute
                path="/dashboard"
                isAdmin={true}
                exact
                component={Dashboard}
            />
            <ProtectedRoute
                path="/admin/products"
                exact
                component={ProductList}
            />
            <ProtectedRoute
                path="/admin/product"
                exact
                component={NewProduct}
            />
            <ProtectedRoute
                path="/admin/product/:id"
                exact
                component={UpdateProduct}
            />
            <ProtectedRoute path="/admin/orders" exact component={OrdersList} />
            <ProtectedRoute
                path="/admin/order/:id"
                exact
                component={ProcessOrder}
            />
            <ProtectedRoute path="/admin/users" exact component={UsersList} />
            <ProtectedRoute path="/admin/user/:id" exact component={UpdateUser} />
        </Router>
    );
}

export default App;
