import { useState } from "react"
import { Carousel } from "flowbite-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faImage, faLeftLong, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import FullImageCarousel from "../modals/FullImageCarousel"

const CustomCarousel = ({ images }) => {
    const [currentSlide, setCurrentSlide ] = useState(0)
    const [ showFullImage, setShowFullImage ] = useState(false)

    const toggleShowFullImage = () => {
        setShowFullImage(prev => !prev)
    }

    const LeftButton = () => {
        return (
            <button className={`${images.length === 1 || currentSlide === 0 ? "hidden" : "block"}`}>
                <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 p-4 bg-black rounded-full"/>
            </button>
        )
    }

    const RightButton = () => {
        return (
            <button className={`${images.length === 1 || currentSlide + 1 === images.length ? "hidden" : "block"}`}>
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
        <div className='relative h-36 my-4 sm:h-64 xl:h-[400px] 2xl:h-[600px]'>
            <div className={`absolute z-10 ${images.length > 1 ? "flex" : "hidden"} items-center gap-2 p-2 bg-black rounded-xl top-2 end-2`}>
                {currentSlide + 1}/{images.length} 
                <FontAwesomeIcon icon={faImage} />
            </div>
            <Carousel {...carouselProps} onClick={toggleShowFullImage} >
                {images.map(image => {
                    return (
                        <img src={image} className="" key={image}/>
                    )
                })}
            </Carousel>
            {showFullImage && <FullImageCarousel images={images} handleClose={toggleShowFullImage} slideIndex={currentSlide}/>}
        </div>
    )
}

export default CustomCarousel