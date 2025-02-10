// import React from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"

const Banner = () => {
     return (
          <div className="w-full">
               <AspectRatio ratio={16 / 9}>
                    <img src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473861sXJ/skincare-la-gi.jpg" alt="Image" className="rounded-md object-cover" />
               </AspectRatio>
          </div>
     )
}
 
export default Banner