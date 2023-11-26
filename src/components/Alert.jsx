import React, { useState } from 'react'

export default function Alert(props) {
    return (
        <div style={{height:'100px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show role=alert`}>
            <strong>{props.alert.message}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )
}
