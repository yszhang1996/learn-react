import React, { Component } from 'react';

class Child extends Component {

    state = {
        users: `[
            { id: '001', name: 'tom', age: 18 },
            { id: '002', name: 'jeck', age: 19 },
            { id: '003', name: 'jeery', age: 17 },
        ]`
    }

    render() {
        return (
            <div>
                <h2>我是Child组件</h2>
                {
                    this.state.users.map((userObj) => {
                        return <h4 key={userObj.id}>{userObj.name}----{userObj.age}</h4>
                    })
                }
            </div>
        );
    }
}

export default Child;
