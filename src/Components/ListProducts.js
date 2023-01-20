import React, { useState } from "react";
import data from "../data.json";

export const ListProducts = ({
    allProducts,
    setAllProducts,
    count,
    setCount,
    total,
    setTotal,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [dataJson, setDataJson] = useState(data);
    const [errorMessage, setErrorMessage] = useState("");

    const addProduct = (product) => {
        if (product.stock === 0) {
            setErrorMessage(
                `Lo sentimos, el producto ${product.name} no está disponible en este momento.`
            );
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }
        if (allProducts.find((item) => item.id === product.id)) {
            const products = allProducts.map((item) =>
                item.id === product.id ? { ...item, cant: item.cant + 1 } : item
            );
            setTotal(total + product.unit_price * product.cant);
            setCount(count + product.cant);
            return setAllProducts([...products]);
        }
        if (product.cant > product.stock) {
            setErrorMessage(
                `Lo sentimos, el producto ${product.name} alcanzo las unidades en stock`
            );
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        setTotal(total + product.unit_price * product.cant); //multiplica valor de articulos repetidos
        setCount(count + product.cant); //Actualiza cantidad de articulos seleccionados
        setAllProducts([...allProducts, product]);
        //console.log(`productos adicionados -- ${JSON.stringify(allProducts)}`);
    };

    return (
        <>
            <div className="container-items">
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
                {dataJson.products.map((item, index) => (
                    <div className="item" key={item.id}>
                        <figure>
                            <img src={item.img} alt={item.name} />
                        </figure>
                        <div className="info-product">
                            <h2>{item.name}</h2>
                            <p>Disponible: {item.stock}</p>
                            <p className="price">${item.unit_price}</p>
                            <button
                                className="btn-add-cart"
                                onClick={() => addProduct(item)}
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
