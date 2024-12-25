import React,{useState, useEffect} from 'react'
import success from "../../assets/success.png"; 

const CheckoutPage = ({currentDate, cartItems, subtotal, totalWithExtras}) => {
    
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const orderNumber = Math.floor(Math.random() * 100000);
      const [selectedPayment, setSelectedPayment] = useState(
        "Direct Bank Transfer"
      );
    
      const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
      };
    
    

  return (
    <div>
        <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h3>Your order is completed!</h3>
                    <p>Thank you. Your order has been received.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Order Number</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Date</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Total</p>
                      <h4>${totalWithExtras.toFixed(2)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Payment Method</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Order Details</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr>
                              <td>
                                {items.title} x {items.quantity}
                              </td>
                              <td>${items.price * items.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>${subtotal.toFixed(2)}</td>

                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>$5</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>$11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>${totalWithExtras.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default CheckoutPage