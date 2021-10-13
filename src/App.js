import axios from "axios";
import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }
  onSort = sortType => {
    this.setState({sortType})
  }
  async componentDidMount() {
    let cart = localStorage.getItem("cart");

    const products = await axios.get("http://localhost:3001/products");
    cart = cart ? JSON.parse(cart) : {};

    this.setState({ products: products.data, cart });
  }

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.count) {
      cart[cartItem.id].amount = cart[cartItem.id].product.count;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    const sure = window.confirm(
      "Are you sure for you want to delete this product ?"
    );

    if (sure) {
      let cart = this.state.cart;
      delete cart[cartItemId];
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ cart });
    }
  };

  clearCart = () => {
    const sure = window.confirm(
      "Are you sure for you want to clear this products ?"
    );
    if (sure) {

      let cart = {};
      localStorage.removeItem("cart");
      this.setState({ cart });
    }
  };

  checkout = () => {
    const cart = this.state.cart;

    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        p.count = p.count - cart[p.name].amount;

        axios.put(`http://localhost:3001/products/${p.id}`, { ...p });
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="container">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand navbar-item">
                {" "}
                Test shop list app
                <label
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div
                className={`navbar-menu  ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >
                <Link to="/products" className="navbar-item">
                  Products
                </Link>

                <Link to="/add-product" className="navbar-item">
                  Add Product
                </Link>

                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "hsl(204, 86%, 53%)",
                    }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
