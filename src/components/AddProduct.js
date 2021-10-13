import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

const initState = {
  name: "",
  count: "",
  weight: "",
  comments: "",
  imageUrl: ""
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { name, count, weight, comments, imageUrl } = this.state;

    if (name && count) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post(
        'http://localhost:3001/products',
        { id, name, count, weight, comments, imageUrl },
      )

      this.props.context.addProduct(
        {
          name,
          weight,
          comments,
          imageUrl,
          count: count || 0
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Product created successfully' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name weigth and count ' }}
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, count, weight, comments, imageUrl } = this.state;
    //const { user } = this.props.context;

    return (
      <>
        <div className="hero " style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
          <div className="hero-body container">
            <h4 className="title">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input is-rounded"
                  placeholder="Product name"
                  type="text"
                  name="name"
                  defaultValue={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Weight: </label>
                <input
                  className="input is-rounded"
                  placeholder="Weight"
                  type="number"
                  name="weight"
                  defaultValue={weight}
                  onChange={this.handleChange}
                  
                />
              </div>
              <div className="field ">
                <label className="label">Available in count: </label>
                <input
                  className="input is-rounded"
                  placeholder="Count"
                  type="number"
                  name="count"
                  defaultValue={count}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Comments: </label>
                <input
                  className="input is-rounded "
                  placeholder="Comments"
                  type="text"
                  name="comments"
                  defaultValue={comments}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Image: </label>
                <textarea
                  className="textarea is-rounded"
                  placeholder="Url images"
                  type="url"
                  rows="1"
                  style={{ resize: "none" }}
                  name="imageUrl"
                  defaultValue={imageUrl}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-info is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);