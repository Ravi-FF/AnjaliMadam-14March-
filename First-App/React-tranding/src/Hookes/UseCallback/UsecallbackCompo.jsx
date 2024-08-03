import React, { memo } from 'react'

function UsecallbackCompo() {
    console.log("i am UsecallbackCompo");
    return (
        <div>UsecallbackCompo</div>
    )
}
export default memo(UsecallbackCompo)