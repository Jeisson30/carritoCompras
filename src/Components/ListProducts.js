import React, { useState } from "react";
import data from "../data.json";
import "bootstrap/dist/css/bootstrap.min.css";

const FilterForm = ({ onFilter }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(name, type);
    };
    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </label>
                <label>
                    Tipo:
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control"
                    />
                </label>
                <button type="submit" className="btn btn-success">
                    Filtrar
                </button>
            </form>
        </div>
    );
};

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

    //crear estado para guardar productos filtrados
    const [filteredProducts, setFilteredProducts] = useState(data.products);

    const filterProducts = (name, type) => {
        setFilteredProducts(
            dataJson.products.filter(
                (product) => product.name === name && product.type === type
            )
        );
    };
    const resetFilter = () => {
        setFilteredProducts(dataJson.products);
    };

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
            {/* agrega un componente de formulario para filtrar los productos */}
            <FilterForm onFilter={filterProducts} />
            <button onClick={resetFilter} className="btn btn-success">
                Mostrar Todo
            </button>
            <div className="container-items row">
                {errorMessage && (
                    <div className="error-message d-block">{errorMessage}</div>
                )}
                {filteredProducts.map((item, index) => (
                    <div
                        className="col-lg-4 col-md-6 col-12 item"
                        key={item.id}
                    >
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
