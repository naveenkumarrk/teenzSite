import React, { useState } from 'react';
import { resetCart } from '../../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Simple Alert Component
const Alert = ({ children }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    {children}
  </div>
);

const ShippingAddress = ({ cartItems, subtotal, totalWithExtras }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [selectedPayment, setSelectedPayment] = useState("Direct Bank Transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postcode: '',
    country: '',
    phone: ''
  });
  const [showError, setShowError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const validateForm = () => {
    return formData.street && 
           formData.city && 
           formData.postcode && 
           formData.country && 
           formData.phone;
  };

  const handleOrderConfirmation = async () => {
    if (!validateForm()) {
      setShowError(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Process successful
      dispatch(resetCart());
      navigate('/order-success', { 
        state: { 
          orderDetails: {
            items: cartItems,
            total: totalWithExtras,
            shipping: formData,
            paymentMethod: selectedPayment
          }
        }
      });
    } catch (error) {
      setShowError(true);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-2xl font-semibold">Billing Details</h4>
          
          {showError && (
            <Alert>
              Please fill in all required fields
            </Alert>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="street"
              placeholder="Street Address*"
              required
              className="w-full p-2 border rounded"
              value={formData.street}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Town / City *"
              required
              className="w-full p-2 border rounded"
              value={formData.city}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="postcode"
              placeholder="Postcode / ZIP *"
              required
              className="w-full p-2 border rounded"
              value={formData.postcode}
              onChange={handleFormChange}
            />
            <select
              name="country"
              className="w-full p-2 border rounded"
              value={formData.country}
              onChange={handleFormChange}
            >
              <option value="" disabled>Country / Region</option>
              <option value="India">India</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Turkey">Turkey</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              required
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={handleFormChange}
            />
          </div>
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
                      <td className="py-2">{item.title} x {item.quantity}</td>
                      <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
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
                    <td className="text-right font-bold">${totalWithExtras.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            {['Direct Bank Transfer', 'Check Payments', 'Cash on delivery', 'Paypal'].map((method) => (
              <label key={method} className="flex items-center space-x-3 p-3 border rounded cursor-pointer">
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
          </div>

          <div className="text-sm text-gray-600">
            Your personal data will be used to process your order, support your experience 
            throughout this website, and for other purposes described in our{' '}
            <Link to="/terms" onClick={scrollToTop} className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>.
          </div>

          <button
            onClick={handleOrderConfirmation}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;