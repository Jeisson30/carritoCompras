import React from "react";
import { useState } from "react";

export const HeaderPage = ({
    allProducts,
    setAllProducts,
    total,
    count,
    setCount,
    setTotal,
}) => {
    const [state, setState] = useState(false);

    const deleteProduct = (product) => {
        const res = allProducts.filter((item) => item.id !== product.id);

        setTotal(total - product.unit_price * product.cant);
        setCount(count - product.cant);
        setAllProducts(res);
    };
    const clearCar = () => {
        setAllProducts([]);
        setTotal(0);
        setCount(0);
    };

    return (
        <header>
            <h1>Alternova Shop</h1>

            <div className="container-icon">
                <div
                    className="container-cart-icon"
                    onClick={() => setState(!state)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="icon-cart"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    <div className="count-products">
                        <span id="contador-productos">{count}</span>
                    </div>
                </div>

                <div
                    className={`container-cart-products ${
                        state ? "" : "hidden-cart"
                    }`}
                >
                    {allProducts.length ? (
                        <>
                            <div className="row-product">
                                {allProducts.map((product) => (
                                    <div
                                        className="cart-product"
                                        key={product.id}
                                    >
                                        <div className="info-cart-product">
                                            <span className="cantidad-producto-carrito">
                                                {product.cant}
                                            </span>
                                            <p className="titulo-producto-carrito">
                                                {product.name}
                                            </p>
                                            <span className="precio-producto-carrito">
                                                ${product.unit_price}
                                            </span>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="icon-close"
                                            onClick={() =>
                                                deleteProduct(product)
                                            }
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-total">
                                <h3>Total:</h3>
                                <span className="total-pagar">${total}</span>
                            </div>
                            <button
                                className="btn-clear-all"
                                onClick={() => clearCar()}
                            >
                                Eliminar productos
                            </button>
                        </>
                    ) : (
                        <p className="cart-empty">Tu carrito esta vácio ...</p>
                    )}
                </div>
            </div>
        </header>
    );
};
