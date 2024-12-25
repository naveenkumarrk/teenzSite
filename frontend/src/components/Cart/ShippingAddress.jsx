// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { saveShippingAddress } from "../../redux/slices/CartSlice";

// function ShippingScreen({ history }) {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress={} } = cart;

//   // STATE
//   const [address, setAddress] = useState(shippingAddress.address);
//   const [city, setCity] = useState(shippingAddress.city );
//   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode );
//   const [country, setCountry] = useState(shippingAddress.country);

//   const dispatch = useDispatch();

//   // HANDLER
//   const submitHandler = (e) => {
//     e.preventDefault();

//     dispatch(
//       saveShippingAddress({
//         address,
//         city,
//         postalCode,
//         country,
//       })
//     );

//     history.push("/payment");
//   };

//   return (
//     <div className="form-container">
//       <h1>Shipping</h1>

//       <form onSubmit={submitHandler} className="shipping-form">
//         {/* Address Input */}
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <input
//             type="text"
//             id="address"
//             placeholder="Enter Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//             className="form-input"
//           />
//         </div>

//         {/* City Input */}
//         <div className="form-group">
//           <label htmlFor="city">City</label>
//           <input
//             type="text"
//             id="city"
//             placeholder="Enter City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//             className="form-input"
//           />
//         </div>

//         {/* Postal Code Input */}
//         <div className="form-group">
//           <label htmlFor="postalCode">Postal Code</label>
//           <input
//             type="text"
//             id="postalCode"
//             placeholder="Enter Postal Code"
//             value={postalCode}
//             onChange={(e) => setPostalCode(e.target.value)}
//             required
//             className="form-input"
//           />
//         </div>

//         {/* Country Input */}
//         <div className="form-group">
//           <label htmlFor="country">Country</label>
//           <input
//             type="text"
//             id="country"
//             placeholder="Enter Country"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//             className="form-input"
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-btn">Continue</button>
//       </form>
//     </div>
//   );
// }

// export default ShippingScreen;
import React, { useState } from "react";
import { saveShippingAddress } from "../../redux/slices/CartSlice"; // Ensure saveShippingAddress is imported
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Simple Alert Component
const Alert = ({ children }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    {children}
  </div>
);

const ShippingAddress = () => {
 
  const cart = useSelector((state) => state.cart);
  const { shippingAddress = {} } = cart;
  
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correct usage of useNavigate

  const [selectedPayment, setSelectedPayment] = useState(
    "Direct Bank Transfer"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };


  // STATE
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [showError, setShowError] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  };
  const shippingCost = 5;
  const VAT = 11;
  const subtotal = calculateSubtotal();
  const totalWithExtras = subtotal > 0 ? subtotal + shippingCost + VAT : 0;

  // HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !country) {
      setShowError(true);
      return;
    }

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate("/payment"); // Correct usage of navigate
  };

  return (
    <div className="mt-[100px] max-w-6xl mx-auto p-4">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Shipping</h1>
  
        {showError && <Alert>Please fill in all required fields.</Alert>}
  
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Address Input */}
          <div className="space-y-4">
            <input
              type="text"
              id="address"
              placeholder="Street Address*"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              id="city"
              placeholder="City*"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              id="postalCode"
              placeholder="Postal Code*"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              id="country"
              placeholder="Country*"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            Continue
          </button>
        </form>
      </div>
  
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">Your Order</h3>
          <div className="space-y-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">PRODUCTS</th>
                  <th className="text-right py-2">SUBTOTALS</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">
                      {item.productName} x {item.qty}
                    </td>
                    <td className="text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <th className="text-left py-2">Subtotal</th>
                  <td className="text-right">${subtotal.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-2">Shipping</th>
                  <td className="text-right">$5.00</td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-2">VAT</th>
                  <td className="text-right">$11.00</td>
                </tr>
                <tr>
                  <th className="text-left py-2">Total</th>
                  <td className="text-right font-bold">
                    ${totalWithExtras.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        {/* <div className="space-y-4">
          {[ "Direct Bank Transfer", "Check Payments", "Cash on delivery", "Paypal"].map((method) => (
            <label
              key={method}
              className="flex items-center space-x-3 p-3 border rounded cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={selectedPayment === method}
                onChange={handlePaymentChange}
                className="form-radio"
              />
              <span>{method}</span>
            </label>
          ))}
        </div> */}
  
        <div className="text-sm text-gray-600">
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
          <Link to="/terms" onClick={scrollToTop} className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
  
        {/* <button
          onClick={handleOrderConfirmation}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button> */}
      </div>
    </div>
  </div>
  
  );
};

export default ShippingAddress;
