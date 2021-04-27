import React, { Component } from 'react'
// import Demo from './components/1_setState'
// import Demo from './components/2_lazyLoad'
import Parent from './components/8_ErrorBoundary/Parent'

export default class App extends Component {
    render() {
        return (
            <div>
                <Parent x={101} />
            </div>
        )
    }
}
