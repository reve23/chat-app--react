import React from 'react'

const Button = ({onClick = null,children = null}) => {
    return <button className="btn btn-primary mx-5 my-5" onClick={onClick}>{children}</button>
}

export default Button
