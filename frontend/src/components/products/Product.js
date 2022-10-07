import React from "react";

function Product() {
    return (
        <>
            <div className="relative hidden md:flex flex-col m-5 bg-white p-8 shadow-md hover:shadow-xl transform duration-500 hover:scale-105 cursor-pointer">
                <img
                    className="rounded w-full h-full"
                    src="https://elearn-ivory.vercel.app/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Felearn-ivory.appspot.com%2Fo%2Fimages%252Fscience.jpg%3Falt%3Dmedia%26token%3D73a111ef-56cc-4ffc-b7b0-1b991ade11ac&w=256&q=75"
                    alt=""
                />
                <p className="absolute top-3 right-4 text-xs text-gray-700 italic">
                    category
                </p>
                <h4 className="mt-2 font-bold text-xl md:text-2xl">title</h4>
                <p className="text-xs my-2 line-clamp-2 italic">description</p>
                <div className="font-bold justify-between inline-flex items-baseline">
                    <div className="text-lg bg-gray-100 rounded-md p-1 px-2 text-blue-600">
                        $250
                    </div>
                    <div className="text-yellow-400">Ratings</div>
                </div>
            </div>
            <div className="prod relative md:hidden my-1 bg-white flex cursor-pointer shadow-md">
                <img
                    src="https://elearn-ivory.vercel.app/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Felearn-ivory.appspot.com%2Fo%2Fimages%252Fscience.jpg%3Falt%3Dmedia%26token%3D73a111ef-56cc-4ffc-b7b0-1b991ade11ac&w=256&q=75"
                    alt=""
                    className="shadow-md"
                />
                <div className="px-4 py-2 w-full">
                    <p className="absolute top-2 right-2 text-xs italic">
                        category
                    </p>
                    <h4 className="font-bold text-xl py-2">Title</h4>
                    <p className="text-xs line-clamp-2 italic">
                        hi masoom product free
                    </p>
                    <div className="flex w-full justify-between items-baseline mt-1">
                        <p className="flex sm:text-md bg-gray-200 p-1 rounded-md text-blue-500 font-semibold">
                            $250
                        </p>
                        <p className="flex text-lg">ratings</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
