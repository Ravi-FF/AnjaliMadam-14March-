import React from 'react'
import ChildComponent6 from './ChildComponent6'

export default function ParentComponent6() {
    let language = ["java", "react", "css", "c++"]
    return (
        <ChildComponent6 myLanguage={language} />
    )
}
