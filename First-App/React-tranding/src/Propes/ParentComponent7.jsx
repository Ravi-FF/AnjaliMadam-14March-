import React from 'react'
import ChildComponent7 from './ChildComponent7'

export default function ParentComponent7() {
    let data = [{
        id: 1,
        name: "AAA",
        subject: "java"
    }, {
        id: 2,
        name: "BBB",
        subject: "script"
    }, {
        id: 3,
        name: "CCC",
        subject: "Flutter"
    }
    ]
    return (
        <div>
            <ChildComponent7 dataSend={data} />
        </div>
    )
}
