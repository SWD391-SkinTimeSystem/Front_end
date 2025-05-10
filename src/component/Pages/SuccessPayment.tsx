import React from 'react';

const SuccessPayment: React.FC = () => {
     const notifyPaymentSuccess = () => {
          alert('Payment Successful! Thank you for your purchase.');
     };

     return (
          <div>
               <h1>Payment Success</h1>
               <button onClick={notifyPaymentSuccess}>Notify Customer</button>
          </div>
     );
};

export default SuccessPayment;