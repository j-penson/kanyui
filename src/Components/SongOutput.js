import React from "react";

const noteText = (props) => {
    return (
        <div>
            <p/>
            <h4>Clinical Note</h4>
            <div className="card">
                <div className="card-body">
                    {props.noteText}
                </div>
            </div>
        </div>
    )
};

export default noteText;


