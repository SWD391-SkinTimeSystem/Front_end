import SkinTherapistCard from "@/component/Molecules/SkinTherapistCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTherapist } from "@/hooks/useTherapist";

// export const DisplayTherapist = () => {
//      const { therapists, loading, error } = useTherapist();
//      if (loading) {
//           return <h1>Loading...</h1>;
//      }
//      if (error) {
//           return <h1>{error}</h1>;
//      }
//      return (
//           <>
//                <Carousel>
//                     <CarouselContent>
//                          <CarouselItem className='basis-1/4'>
//                               <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
//                          </CarouselItem>
//                     </CarouselContent>
//                     <CarouselPrevious />
//                     <CarouselNext />
//                </Carousel>
//           </>
//      )
// }