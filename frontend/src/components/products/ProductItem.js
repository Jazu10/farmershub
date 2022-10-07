import React from "react";
import Product from "./Product";
function productItem() {
    return (
        <main className="mx-auto max-w-screen-2xl">
            <div className="prods mx-4 md:mx-0 md:px-6 lg:px-10 mb-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense ">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </main>
    );
}

export default productItem;
