import React from 'react'

const ValidationText = (props) => {
    return (
        props.error?
        <div className="text-[14px] text-red-600">{props.error}</div>
        :null
    )
}

export default ValidationText;
