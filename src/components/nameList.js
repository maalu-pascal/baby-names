import React, { Component } from 'react';

class List extends Component {
    render() {
        let list = JSON.parse(localStorage.getItem("List"));        
        return (list) ? <ul>
            {list.map((data) => {
                console.log(data)
                return <li key={data.name}>{data.name}</li>
            })}
        </ul> : null
    }
}

export { List }