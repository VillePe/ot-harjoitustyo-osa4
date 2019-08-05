import React, {useState} from 'react'

const TogglableText = (props) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display: visible ? "none" : ""}
    const showWhenVisible = {display: visible ? "" : "none"}

    return (
        <div>
            <div style={hideWhenVisible}>
                <div onClick={() => setVisible(true)}>{props.buttonLabel}</div>            
            </div>
            <div style={showWhenVisible}>
                {props.children}            
                <button onClick={() => setVisible(false)}>Hide</button>
            </div>
        </div>
    )
}

export default TogglableText