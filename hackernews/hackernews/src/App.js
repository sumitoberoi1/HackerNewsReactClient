import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { isString } from 'util';
const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm : ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(objectID) {
    console.log(this);
    const modifiedList = this.state.list.filter(item=>item.objectID !== objectID);
    this.setState({list:modifiedList});
  }
  onSearchChange(event) {
    this.setState({searchTerm:event.target.value});
  }

  render() {
    const {searchTerm,list} = this.state
    return (
      <div className = "App">
        <Search value={searchTerm} 
                onChange={this.onSearchChange}
        >Search</Search>
        <Table list = {list}
                pattern = {searchTerm}
                onDismiss = {this.onDismiss}
        />
      </div>  
    );
  }
}

function Search({value,onChange,children}) {
    return (
      <form>
       {children} <input type="text" onChange = {onChange} value={value}/>
      </form>
    )
}

function Table({list, pattern,onDismiss}) {
    return (
      <div>
        {
          list
          .filter(item => item.title.toLowerCase().includes(pattern.toLocaleLowerCase()))
          .map(item => 
            <div key = {item.objectID}>
              <span>
                <a href = {item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.points}</span>
              <span> <Button onClick = {() => onDismiss(item.objectID)}>Dismiss</Button></span>
            </div>)
        }
      </div>
    )
}

function Button( {onClick,className = '', children}) {
    return(
      <button onClick = {onClick}
              className = {className}
              type = "button">
              {children}
      </button>
    )
}

export default App;
