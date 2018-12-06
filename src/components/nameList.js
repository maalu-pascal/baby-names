import React, { Component } from 'react';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: JSON.parse(localStorage.getItem('List')),
        }

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

    //For custom list drag and drop.
    dragStart(e) {
      this.dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.dragged);
      console.log("start: ", e.dataTransfer);
    }

    dragEnd(e) {
      this.dragged.style.display = 'block';
      this.dragged.parentNode.removeChild(placeholder);
    //   console.log(this.over.dataset);
      
      // update state
      var data = this.state.list;
      console.log("data: ", data);
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);
      if(from < to) to--;
      data.splice(to, 0, data.splice(from, 1)[0]);
      console.log("data: ", from, to, data.splice(to, 0, data.splice(from, 1)[0]));
      
      this.setState({colors: data});
    }
    dragOver(e) {
        // console.log(this.dragged);
        
      e.preventDefault();
      this.dragged.style.display = "none";
      if(e.target.className === 'placeholder') return;
      this.over = e.target;
      e.target.parentNode.insertBefore(placeholder, e.target);
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
                // return <p>custom</p>;
                var listItems = list.map((item, i) => {
                    let nameChecked = (item.flag) ? 'checked' : '';
                    let strikeName = (item.flag) ? <s>{item.name}</s> : (item.name);

                    return (
                        <li
                            data-id={i}
                            key={i}
                            draggable='true'
                            onDragEnd={this.dragEnd.bind(this)}
                            onDragStart={this.dragStart.bind(this)}
                        >{strikeName}
                    </li>
                    )
                });
                return (
                    <ul 
                    onDragOver={this.dragOver.bind(this)}
                    >
                        {listItems}
                    </ul>
                )
            // break;

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