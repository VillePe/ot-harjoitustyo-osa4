import React from 'react'

const Notification = (props) => {
    if (props.message === undefined ||props.message.length === 0) {
        return (<div></div>)
    }
    return (
        <div class="error">
            {props.message}
        </div>
    )
}

export default Notification;