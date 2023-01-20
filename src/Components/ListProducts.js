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
    const addProduct = (product) => {
        if (allProducts.find((item) => item.id === product.id)) {
            const products = allProducts.map((item) =>
                item.id === product.id ? { ...item, cant: item.cant + 1 } : item
            );
            setTotal(total + product.unit_price * product.cant);
            setCount(count + product.cant);
            return setAllProducts([...products]);
        }

        setTotal(total + product.unit_price * product.cant); //multiplica valor de articulos repetidos
        setCount(count + product.cant); //Actualiza cantidad de articulos seleccionados
        setAllProducts([...allProducts, product]);
        //console.log(`productos adicionados -- ${JSON.stringify(allProducts)}`);
    };

    // eslint-disable-next-line no-unused-vars
    const [dataJson, setDataJson] = useState(data);

    return (
        <div className="container-items">
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
    );
};
