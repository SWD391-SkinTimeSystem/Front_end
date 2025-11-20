import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import SkinTherapistCard from './SkinTherapistCard';
import { Skintherapist } from '@/types/skintherapist';



interface SkinTherapistListProps {
     therapists: Skintherapist[];
     onData: (data: string, disable: boolean) => void;
}


const SkinTherapistList: React.FC<SkinTherapistListProps> = ({ therapists, onData }) => {
     
     return (
          <div className='w-[95%] mx-auto'>
          <Carousel>
               <CarouselContent>
                    {therapists.map((therapist) => (
                         <CarouselItem key={therapist.id} className='basis-1/4'>
                              <SkinTherapistCard sendDataToParent={onData} therapist={therapist}/>
                         </CarouselItem>
                    ))}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
          </Carousel>

     </div>
     );
};

export default SkinTherapistList;