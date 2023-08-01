import "./deletePopup.scss"

const DeletePop = () => {
  return (
    <div className="delete">
        <p>Are you sure want to delete the student ?</p>
        <div className="deleteBtns">
            <button>Cancel</button>
            <button>Yes</button>
        </div>

      
    </div>
  )
}

export default DeletePop
