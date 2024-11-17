import React, { useRef, useState } from "react";
import styles from "./NoteImage.module.css";
import ShiftBtn from "./ShiftBtn";

const NoteImage = (props) => {
  const editImg = () => {
    console.log(props);
    props.onEdit(props.imageData);
  };
  const deleteImg = () => {
    props.onDelete(props.imageData);
  };
    
const [currentImg, setCurrentImg] = useState(props.imageData)
  const file = useRef();
  const changeImage = () => {
    const reader = new FileReader();
    let uploadedImage = "";
    reader.onload = (evt) => {
      uploadedImage = reader.result;
        setCurrentImg(prev => uploadedImage);
    };
    reader.readAsDataURL(file.current.files[0]);
  };
  const move = () => {
    props.onMoveUp(props.index)
  }
  return (
    <div className="img-container">
      <ShiftBtn move={move} className="imgShift"></ShiftBtn>
      <div className="delete-imgBtn imgBtn" onClick={deleteImg}>
        Delete
      </div>
      
      <label for="inputTag" className="edit-imgBtn imgBtn">
          Edit
              <input type="file" ref={file} id="inputTag" className="input-img" onClick={editImg} onChange={ changeImage} />
        </label>
      <img
        className="img detail"
        type="image"
        src={currentImg}
        alt=""
      ></img>
    </div>
  );
};
// TODO: deleting image is not possible when you edit it
export default NoteImage;
