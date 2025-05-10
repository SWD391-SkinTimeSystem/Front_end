import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ServicePaymentAmountProps {
     amount: number;
}

const ServicePaymentAmount: React.FC<ServicePaymentAmountProps> = ({ amount }) => {
     const [isOpen, setIsOpen] = useState(true);
     return (
          <div className='m-5'>
                    <div className="mt-4 border-t pt-4">
                         <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                              <strong>Cần đặt cọc:</strong>
                              <span className="text-lg font-bold text-emerald-700">
                                   34.000đ
                              </span>
                         </div>
                         <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                         >
                              <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-inner">
                                   <p className="flex justify-between">
                                        <span>Tổng tiền:</span>
                                        <span>340.000đ</span>
                                   </p>
                                   <p className="flex justify-between">
                                        <span>Voucher giảm:</span>
                                        <span>40.000đ</span>
                                   </p>
                                   <p className="flex justify-between">
                                        <span>Cần phải cọc:</span>
                                        <span>34.000đ (10% số tiền)</span>
                                   </p>
                                   <p className="flex justify-between text-emerald-700 font-bold border-t pt-2 mt-2">
                                        <span>Cần thanh toán:</span>
                                        <span>34.000đ</span>
                                   </p>
                              </div>
                         </motion.div>
                    </div>
               </div>
     );
};

export default ServicePaymentAmount;