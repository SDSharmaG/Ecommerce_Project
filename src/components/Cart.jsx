import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart = [], setCart }) => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Your order has been placed!");
    setCart([]);
    navigate("/");
  };

  const updateCart = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container pt-5" style={{ marginTop: "80px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-light" onClick={goToHome}>
          &larr; Continue Shopping
        </button>
        <h3>Your Cart</h3>
        <button
          className="btn btn-success"
          onClick={handleOrder}
          disabled={cart.length === 0}
        >
          Place Order
        </button>
      </div>

      {cart.length === 0 && (
        <p className="text-center fs-5 text-muted">Your cart is empty.</p>
      )}

      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                className="card-img-top p-3"
                alt={item.title}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: ${item.price}</p>

                <div className="mb-2">
                  <label htmlFor={`quantity-${item.id}`} className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) => updateCart(item.id, e.target.value)}
                  />
                </div>

                <p className="mt-auto">
                  Item Total:{" "}
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="d-flex justify-content-end mt-4">
          <h4>
            Total: <strong>${total.toFixed(2)}</strong>
          </h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
