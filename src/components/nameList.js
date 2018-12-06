import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck(event) {
        let list = JSON.parse(localStorage.getItem('List'));
        let newList = list.map((details) => {
            if (details.name === event.target.value) {
                details.flag = event.target.checked;
            }
            return details;
        });

        localStorage.setItem('List', JSON.stringify(newList))
        this.props.updateList();

    }

    render() {
        let list = JSON.parse(localStorage.getItem("List"));
        if (list) {
            switch (this.props.sort) {
                case 'alphabetic':
                    console.log('alphabetic');
                    list.sort((sortNameA, sortNameB) => {
                        var nameA = sortNameA.name.toUpperCase();
                        var nameB = sortNameB.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    console.log(list);

                    break;

                case 'time':
                    console.log('time');
                    list.sort((a, b) => { return a.date - b.date });
                    console.log(list);
                    break;

                case 'custom':
                    console.log('custom');
                    return <p>custom</p>

                default:
                    console.log('default');
            }
            return <ul>
                {list.map((data) => {
                    let nameChecked = (data.flag) ? 'checked' : '';
                    let strikeName = (data.flag) ? <s>{data.name}</s> : (data.name);
                    return <li key={data.name}>
                        <label htmlFor={data.name}>
                            <input type='checkbox' id='{data.name}' value={data.name} onChange={this.onCheck} checked={nameChecked} />{strikeName}
                        </label>
                    </li>
                })}
            </ul>
        }
        return null;
    }
}

export { List }