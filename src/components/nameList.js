import React, { Component } from 'react';

class List extends Component {
    render() {
        let list = JSON.parse(localStorage.getItem("List"));        
        return (list) ? <ul>
            {list.map((name) => {
                return <li key={name}>{name}</li>
            })}
        </ul> : null
    }
}

export { List }