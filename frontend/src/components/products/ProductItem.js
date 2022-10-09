import React from "react";
import Product from "./Product";
function productItem({ products }) {
    return (
        <main className="mx-auto max-w-screen-2xl">
            <div className="prods mx-4 md:mx-0 md:px-6 lg:px-10 mb-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense ">
                {products &&
                    products.map(
                        ({
                            _id,
                            category,
                            description,
                            name,
                            numOfReviews,
                            reviews,
                            ratings,
                            seller,
                            stock,
                            price,
                            images,
                        }) => (
                            <Product
                                key={_id}
                                _id={_id}
                                category={category}
                                description={description}
                                name={name}
                                numOfReviews={numOfReviews}
                                reviews={reviews}
                                stock={stock}
                                price={price}
                                images={images}
                                ratings={ratings}
                                seller={seller}
                            />
                        ),
                    )}
            </div>
        </main>
    );
}

export default productItem;
