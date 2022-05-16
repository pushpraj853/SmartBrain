import React from "react";

const Rank = ({name, entries}) => {
  return (
    <div >
      <div className="white f3">
        {`${name}, We've detected ${entries} faces for you till now.`}
      </div>
    </div>
  )
}

export default Rank;