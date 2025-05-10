import React from 'react';

const FailurePayment: React.FC = () => {
     const displayCustomerPaidFailure = () => {
          return (
               <div>
                    <h1>Payment Failed</h1>
                    <p>Unfortunately, your payment could not be processed. Please try again later or contact support.</p>
               </div>
          );
     };

     return (
          <div>
               {displayCustomerPaidFailure()}
          </div>
     );
};

export default FailurePayment;