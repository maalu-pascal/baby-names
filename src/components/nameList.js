import React, { Component } from 'react';

let setLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
};

let getLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: JSON.parse(localStorage.getItem('List')),
        };

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

        setLocalStorage('List', newList);
        this.props.updateList();

    }

    //For custom list drag and drop.
    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.dragged);
    }

    dragEnd(e) {
        this.dragged.style.display = 'block';
        let from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if (from < to) to--;

        let data = getLocalStorage('List');
        data.splice(to, 0, data.splice(from, 1)[0]);

        this.setState({ list: data });
        setLocalStorage('List', data)
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        this.over = e.target;
    }

    render() {

        let list = JSON.parse(localStorage.getItem("List"));

        
        if(list.length===0) {
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