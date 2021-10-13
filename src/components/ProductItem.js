import React from "react";

const ProductItem = (props) => {
  const { product } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={product.imageUrl} alt={product.name} />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>{product.name} </b>
            <div>{product.weight}</div>
            {product.count > 0 ? (
              <small>{product.count + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of count</small>
            )}
            <div className="is-clearfix">
              <button
                
                className="button is-small is-outlined is-info   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                  })
                }
              >
                Add to Cart
              </button>

              {product.comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
