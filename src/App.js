import { useState } from "react";
import { ListProducts } from "./Components/ListProducts";
import { HeaderPage } from "./Components/HeaderPage";

function App() {
    const [allProducts, setAllProducts] = useState([]); //Para agregar al carrito
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0); //Contador de productos

    return (
        <div className="App">
            <HeaderPage
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                count={count}
                setCount={setCount}
            />
            <ListProducts
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                count={count}
                setCount={setCount}
            />
        </div>
    );
}

export default App;
