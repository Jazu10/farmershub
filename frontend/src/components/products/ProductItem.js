import React from "react";
import Product from "./Product";
function productItem({ products, search }) {
    return (
        <main className="mx-auto max-w-screen-2xl">
            <div className={`prods mx-4  md:mx-0 md:px-6 lg:px-10 mb-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense ${!search && "-mt-6 md:-mt-36 lg:-mt-40 xl:-mt-52"}`}>
                {products &&
                    products
                        .slice(0, 4)
                        .map(
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
                                schedule,
                                isActive,
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
                                    schedule={schedule}
                                    isActive={isActive}
                                    imgWidth={false}
                                />
                            ),
                        )}
                {/* <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <img
                        alt="./8.jpg"
                        src="./8.jpg"
                        className="h-24 w-full object-cover md:px-5"
                    />
                </div> */}
                <div className="md:col-span-2">
                    {products &&
                        products
                            .slice(4, 5)
                            .map(
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
                                    schedule,
                                    isActive,
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
                                        schedule={schedule}
                                        isActive={isActive}
                                        imgWidth={true}
                                    />
                                ),
                            )}
                </div>
                {products &&
                    products
                        .slice(11, 13)
                        .map(
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
                                schedule,
                                isActive,
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
                                    schedule={schedule}
                                    isActive={isActive}
                                    imgWidth={false}
                                />
                            ),
                        )}
                {products && products.length === 14 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                        <img
                            alt=""
                            src="./8.jpg"
                            className="h-24 w-full object-cover md:px-5"
                        />
                    </div>
                )}
                {products &&
                    products
                        .slice(5, 11)
                        .map(
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
                                schedule,
                                isActive,
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
                                    schedule={schedule}
                                    isActive={isActive}
                                    imgWidth={false}
                                />
                            ),
                        )}
                <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
                    {products &&
                        products
                            .slice(13, 14)
                            .map(
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
                                    schedule,
                                    isActive,
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
                                        schedule={schedule}
                                        isActive={isActive}
                                        imgWidth={true}
                                    />
                                ),
                            )}
                </div>
            </div>
        </main>
    );
}

export default productItem;
