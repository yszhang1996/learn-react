import React, { useEffect } from 'react'

function children() {
    useEffect(() => {
        console.log("触发children----useEffect");

    }, [])
    return (
        <div>children</div>
    )
}

export default children