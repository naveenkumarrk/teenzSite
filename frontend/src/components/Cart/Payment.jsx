import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const Payment = () => {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  };
  const shippingCost = 5;
  const VAT = 11;
  const subtotal = calculateSubtotal();
  const totalWithExtras = subtotal > 0 ? subtotal + shippingCost + VAT : 0;

  return (
    <div className='mt-[150px] grid md:grid-cols-2 gap-8 px-20'>
      <div className="space-y-6">
       
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
        </div>
  
    </div>
  )
}

export default Payment