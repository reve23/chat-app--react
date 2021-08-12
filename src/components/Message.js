import React from 'react'
import {formatRelative} from 'date-fns'
import styles from './message.module.css'

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div className="message d-flex flex-column">
            <div className="flexo-msg d-flex mx-5">
                {
                    photoURL ? (
                        <img src={photoURL} className="rounded-circle" alt="Avatar" width={45} height={45}/>
                    ) : null
                }
                {
                    displayName ? <p className="mx-4 fs-5">{displayName}</p> : null
                }
                {
                    createdAt ?.seconds ?(
                        <span className="fs-6">
                            {formatRelative(new Date(createdAt.seconds * 1000),new Date())}
                        </span>
                    ) : null
                }
            </div>
            <p className="fs-3 mx-5 w-10">{text}</p>
        </div>
    )
}

export default Message
