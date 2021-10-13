import React, { useState } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = (props) => {
  const { products } = props.context;
  const [sortConfig, setSortConfig] = useState(null);

  
  let sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  
  return (
    <>
      <div className="hero" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <div className="hero-body container">
          <h4 className="title">Our Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="select">
          <select>
            <option onChange={()=> setSortConfig('ask')}>Ask</option>
            <option onClick={()=> setSortConfig('desk')} >Desk</option>
          </select>
        </div>

        <div className="column columns is-multiline">
          {products && products.length ? (
            sortedProducts.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Shop list </strong> by{" "}
              <a href="https://github.com/pozitivnuy/" target={"_blank"}>
                Vitaliy Kravets
              </a>
              . The visual code is bulma
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default withContext(ProductList);
