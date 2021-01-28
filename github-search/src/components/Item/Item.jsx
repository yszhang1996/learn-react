import React, { Component } from 'react'
import './Item.css'

export default class Item extends Component {
    render() {
        const {item} = this.props
        return (
            <div className="Item">
                <a className="Item-a" rel="noreferrer" href={item.html_url} target="_blank">
                    <img className="user-img" src={item.avatar_url} alt="userImg" /><br />
                    <span>{item.login}</span>
                </a>
            </div>
        );
    }
}