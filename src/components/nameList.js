import React, { Component } from 'react';
import { store } from './../redux/store';

let getList = () => {
    return store.getState();
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: getList(),
        };
        this.onCheck = this.onCheck.bind(this);
        this.customList = this.customList.bind(this);
    }

    customList = (list) => {
        this.props.customDragDropList(list);
    }

    onCheck(event) {
        let list = getList();
        let id = list.find((nameDetails) => {
            return nameDetails.name === event.target.value
        });
        this.props.checkName(id.id, event.target.checked);
    }

    //For custom drag and drop list.
    dragStart(event) {
        this.dragged = event.currentTarget;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.dragged);
    }

    dragEnd() {
        this.dragged.style.display = 'block';
        let from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if (from < to) to--;

        let data = getList();
        data.splice(to, 0, data.splice(from, 1)[0]);

        this.setState({ list: data });
        this.customList(data);
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        this.over = e.target;
    }

    render() {
        let list = [...store.getState()];

        if (list.length === 0) {
            return <p>No names inserted.</p>
        }

        if (list) {
            switch (this.props.sort) {
                case 'alphabetic':
                    list.sort((sortNameA, sortNameB) => {
                        let nameA = sortNameA.name.toUpperCase();
                        let nameB = sortNameB.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    break;

                case 'time':
                    list.sort((dateA, dateB) => {
                        return new Date(dateA.date) - new Date(dateB.date);
                    });
                    break;

                case 'custom':
                    let listItems = list.map((data, i) => {
                        let nameChecked = (data.flag) ? 'checked' : '';
                        let strikeName = (data.flag) ? <s>{data.name}</s> : (data.name);

                        return (
                            <li data-id={i}
                                key={i}
                                draggable='true'
                                onDragEnd={this.dragEnd.bind(this)}
                                onDragStart={this.dragStart.bind(this)} >
                                <input type='checkbox' id='{data.name}' value={data.name} onChange={this.onCheck} checked={nameChecked} />
                                {strikeName}
                            </li>
                        )
                    });
                    return (
                        <ul onDragOver={this.dragOver.bind(this)} >
                            {listItems}
                        </ul>
                    )

                default:
                    console.log('default');
            }
            return <ul>
                {list.map((data, index) => {
                    let nameChecked = (data.flag) ? 'checked' : '';
                    let strikeName = (data.flag) ? <s>{data.name}</s> : (data.name);
                    return <li key={index}>
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