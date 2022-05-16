import React from "react";
import './ImageLinkForm.css';
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div >
      <p className="f4">
        {'This Magic Brain will detect faces in your picture. Give it a try!!'}
      </p>
      <div className="center">
        <div className="form center pa3 br3 shadow-5">
          <input placeholder="Please enter an image URL" className="f5 pa2 w-75 center" type='text' onChange={onInputChange}/>
          <button 
            className="w-25 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
            >Detect</button>
        </div> 
      </div>
    </div>
  )
}

export default ImageLinkForm;