import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

const SuccNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="succ">
            {message}
        </div>
    )
}

export { Notification, SuccNotification }