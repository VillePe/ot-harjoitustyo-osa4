import React from 'react'

const Notification = (props) => {
    const notification = props.notification;
    if (notification === null || notification.message === undefined ||notification.message.length === 0) {
        return null;
    }    
    const notifClass = notification.class === undefined ? "error" : notification.class;
    
    return (
        <div class={notifClass}>
            {notification.message}
        </div>
    )
}

export default Notification;