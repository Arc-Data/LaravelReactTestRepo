import { faAngleLeft, faAngleRight, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"

const FullImageCarousel = ({ images, handleClose }) => {
    
    useEffect(() => {
        document.body.style.overflow = "hidden"

        const handleKeyPress = (event) => {
            if (event.keyCode === 27) {
                handleClose()
            }
        }

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.body.style.overflow = "auto"
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [])

    const handleNext = () => {

    }

    const handlePrevious = () => {
        
    }
    
    return (
        <div className="fixed inset-0 z-30 w-screen h-screen ">
            <div className="relative flex items-center w-full h-full px-20 bg-black bg-opacity-70">
                <button onClick={handleClose} className="fixed top-2 right-2">
                    <FontAwesomeIcon icon={faXmarkCircle } className="text-4xl bg-black rounded-full"/>
                </button>
                <button className={`block`} onClick={handlePrevious}>
                    <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 p-4 bg-black border rounded-full"/>
                </button>  
                <div className="flex justify-center flex-1">
                    <div className="flex overflow-x-hidden bg-black md:w-2/3">
                        {images.map(image => {
                            return (<img src={image} className="object-cover" />)
                        })}
                    </div>
                </div>              
                <button className={`block`} onClick={handleNext}>
                    <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 p-4 bg-black border rounded-full"/>
                </button>           
            </div>
        </div>
    )
}

export default FullImageCarousel