import React from "react";
import "../../styles/button-styles.css";

function BackButton({onClick}) {
    return ( 
        <button onClick={onClick} className="back_button">
            Back
        </button>
     );
}

export default BackButton;