import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
  render() {
    const hello = ` 1 road to learning react with var`;
    return (
      <div className = "App">
        {
          list.map(item => 
            <div key = {item.objectID}>
              <span>
                <a href = {item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.points}</span>
              {item.title}
            </div>)
        }
        {
          console.log(`this is a log`)
        }
      </div>
    );
  }
}

export default App;
