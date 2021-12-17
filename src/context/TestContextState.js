import React from 'react'
import Context from './Context' 

const TestContextState = (props) => {
    const name = "shahid"
    return (
        <Context.Provider value={{name}}>
            {props.children}
        </Context.Provider>
    )
}

export default TestContextState
