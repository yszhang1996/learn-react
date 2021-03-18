/**
 * 扩展知识2，路由的懒加载
 */
import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Route } from "react-router-dom";
// import Home from './Home';
// import About from './About';

const Home = lazy(() => {
    return import('./Home')
})

const About = lazy(() => {
    return import('./About')
})

class Demo extends Component {
    render() {
        return (
            <div>
                <h2>router</h2>
                <div>
                    <NavLink className="list" to="/about">About</NavLink>
                    <NavLink className="list" to="/home">Home</NavLink>
                </div>
                <div>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Route path="/about" component={About} />
                        <Route path="/home" component={Home} />
                    </Suspense>
                </div>
            </div>
        );
    }
}

export default Demo;
