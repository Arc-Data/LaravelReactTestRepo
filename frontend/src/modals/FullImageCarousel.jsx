import { faAngleLeft, faAngleRight, faImage, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const FullImageCarousel = ({ images, handleClose, slideIndex }) => {
    const [ currentIndex, setCurrentIndex ] = useState(slideIndex)

    useEffect(() => {
        document.body.style.overflow = "hidden"

        const handleKeyPress = (event) => {
            if (event.keyCode === 27) {
                handleClose()
            } else if (event.keyCode === 37) { // Left arrow key
                handlePrevious();
            } else if (event.keyCode === 39) { // Right arrow key
                handleNext();
            }
        }

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.body.style.overflow = "auto"
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [])

    const handleNext = (e) => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }   

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
    
    return (
        <div className="fixed inset-0 z-30 w-screen h-screen ">
            <div className="fixed inset-0 z-10 w-full h-full" onClick={handleClose}></div>
            <div className="fixed z-20 grid items-center h-full grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-2 px-10 bg-black bg-opacity-90" >
                <button onClick={handleClose} className="fixed top-4 right-4">
                    <FontAwesomeIcon icon={faXmarkCircle } className="text-4xl bg-black rounded-full" />
                </button>
                <button className={`${images.length === 1 ? "hidden" : "block"}`} onClick={handlePrevious}>
                    <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 p-4 bg-black border rounded-full"/>
                </button>  
            <div className="flex justify-center flex-1">
                    <div className="flex overflow-x-hidden bg-black md:w-2/3">
                        <img src={images[currentIndex]} className="object-contain" />
                    </div>
                </div>              
                <button className={`${images.length === 1 ? "hidden" : "block"}`} onClick={handleNext}>
                    <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 p-4 bg-black border rounded-full"/>
                </button>           
                <div className="flex items-center justify-center col-span-3 gap-2 py-12 text-xl">
                    {currentIndex + 1}/{images.length} 
                    <FontAwesomeIcon icon={faImage} />
                </div>
            </div>
        </div>
    )
}

export default FullImageCarousel