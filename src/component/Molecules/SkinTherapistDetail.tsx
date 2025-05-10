import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import React from 'react';
import { Skintherapist } from '@/types/skintherapist';

interface SkinTherapistDetailProps {
     therapistId?: Skintherapist;
     changeTherapist: () => void;
}

const SkinTherapistDetail: React.FC<SkinTherapistDetailProps> = ({ therapistId,  changeTherapist}) => {
  
     return (
          <div className='gap-2'>
               <Card className="w-full border border-gray-200 rounded-none mt-5">
                    <div className='flex flex-row'>
                         <div className="p-5">
                              <img src={therapistId?.avatar} alt="" />

                         </div>
                         <CardContent className="p-5">

                              <h2 className="text-lg font-semibold text-gray-900">
                                   {therapistId?.name}
                              </h2>
                              <p className="text-sm text-gray-600 mt-2 mb-1">
                                   {therapistId?.experience} năm kinh nghiệm
                              </p>
                              <div className="flex items-center mt-2">
                                   {therapistId?.rating && (
                                        <div className="flex">
                                             {[...Array(5)].map((_, index) => (
                                                  <span
                                                       key={index}
                                                       className={index < therapistId.rating ? "text-yellow-500" : "text-gray-400"}
                                                  >
                                                       ★
                                                  </span>
                                             ))}
                                        </div>
                                   )}

                                   <span className="text-gray-600 text-sm ml-2"> đánh giá | 68 Hỏi đáp</span>
                                   <span className="text-gray-600 text-sm ml-2">{therapistId?.specialization}</span>

                              </div>
                              <div className="flex gap-2 mt-4">
                                   <Dialog>
                                        <DialogTrigger>
                                             <Button variant="link">Xem Certificate</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                             <DialogHeader>
                                                  <DialogTitle>Mô tả Certificate</DialogTitle>
                                                  <DialogDescription>
                                                       {/* <img
                                                            src={therapistId?.cert_url}
                                                            alt="Aqua Mesoderm"
                                                            className="rounded-lg shadow-lg w-full max-w-xl"
                                                       /> */}
                                                  </DialogDescription>
                                             </DialogHeader>
                                        </DialogContent>
                                   </Dialog>
                                   <Button className="bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md" onClick={changeTherapist}>
                                   {/* onClick={changeTherapist} */}
                                        Đổi chuyên viên
                                   </Button>
                              </div>
                         </CardContent>
                    </div>
               </Card>
          </div>
     );
};

export default SkinTherapistDetail;