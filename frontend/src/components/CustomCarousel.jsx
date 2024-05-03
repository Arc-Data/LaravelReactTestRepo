import { useState } from "react"
import { Carousel } from "flowbite-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faImage, faLeftLong, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const CustomCarousel = ({ images }) => {
    const [currentSlide, setCurrentSlide ] = useState(1)
    
    const LeftButton = () => {
        return (
            <button className={`${images.length === 1 ? "hidden" : "block"}`}>
                <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 p-4 bg-black rounded-full"/>
            </button>
        )
    }

    const RightButton = () => {
        return (
            <button className={`${images.length === 1 ? "hidden" : "block"}`}>
                <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 p-4 bg-black rounded-full"/>
            </button>
        )
    }

    const carouselProps = {
        slide: false,
        indicators: false,
        onSlideChange: (index) => setCurrentSlide(index),
        leftControl: <LeftButton />,
        rightControl: <RightButton />,
    };


    return (
        <div className='relative h-56 my-4 sm:h-64 xl:h-80 2xl:h-96' onClick={() => console.log("This might be a problem")}>
            <div className={`absolute z-50 ${images.length > 1 ? "flex" : "hidden"} items-center gap-2 p-2 bg-black rounded-xl top-2 end-2`}>
                {currentSlide + 1}/{images.length} 
                <FontAwesomeIcon icon={faImage} />
            </div>
            <Carousel {...carouselProps}>
                {images.map(image => {
                    return (
                        <img src={image} className="" key={image}/>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default CustomCarousel