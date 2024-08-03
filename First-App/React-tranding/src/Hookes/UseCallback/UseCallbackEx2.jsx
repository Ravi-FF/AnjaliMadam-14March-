import React, { memo } from 'react'

function UseCallbackEx2({ mylist, addRecord }) {
    console.log("=======> component 2 is calling");
    return (
        <div>
            {mylist.map((value, index) => {
                return <h4 key={index}>{value}</h4>
            })}
            <button onClick={addRecord}>Add Recond</button>
        </div>
    )
}
export default memo(UseCallbackEx2)