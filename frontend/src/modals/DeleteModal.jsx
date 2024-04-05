import Modal from "../components/Modal"

const DeleteModal = ({ closeModal, handleDelete }) => {
    return (
        <Modal onClick={closeModal}>
            <p className="text-xl font-bold">This post will be deleted. Are you sure?</p>
            <div className="flex *:flex-1 *:py-2 mt-8 *:border gap-4 *:rounded-md ">
                <button onClick={closeModal} className="hover:bg-white hover:text-slate-900">Cancel</button>
                <button onClick={handleDelete} className="bg-red-700 border-transparent bg-opacity-20 hover:bg-opacity-80">Delete</button>
            </div>
        </Modal>
    )
}

export default DeleteModal