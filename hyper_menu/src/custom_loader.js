import React from 'react'
import Loader from "react-loader-spinner";

function CustomLoader(props) {
  return (
    <div>
      {props.show && <div id="loading">
        <Loader
          className="loaingComponent"
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
      }
    </div>
  );
}

export default CustomLoader;
