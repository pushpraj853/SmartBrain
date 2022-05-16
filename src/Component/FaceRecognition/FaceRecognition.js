import React from "react";
import './FaceRecognition.css';
const FaceRecongnition = ({imageUrl, box}) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

// https://deliciousthemes.com/wp-content/uploads/Lesson-2/7.jpg

export default FaceRecongnition;