import { useState } from "react"
import { Carousel } from "flowbite-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"

const CustomCarousel = ({ images }) => {
    const [currentSlide, setCurrentSlide ] = useState(1)
    
    return (
        <div className='relative h-56 my-4 sm:h-64 xl:h-80 2xl:h-96'>
            <div className={`absolute z-50 ${images.length > 1 ? "flex" : "hidden"} items-center gap-2 p-2 bg-black rounded-xl top-2 end-2`}>
                {currentSlide + 1}/{images.length} 
                <FontAwesomeIcon icon={faImage} />
            </div>
            <Carousel 
                slide={false} 
                indicators={false} 
                onSlideChange={index => setCurrentSlide(index)}>
                {images.map(image => {
                    return (
                        <img src={image} className=""/>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default CustomCarousel