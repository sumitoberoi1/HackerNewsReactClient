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
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result:null,
      searchTerm : DEFAULT_QUERY
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  async fetchSearchTopStories(searchTerm) {
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const result = await response.json();
      this.setSearchTopStories(result);
    } catch (e) {
      console.log(e)
    }
  }

  onDismiss(objectID) {
    console.log(this);
    const modifiedList = this.state.list.filter(item=>item.objectID !== objectID);
    this.setState({list:modifiedList});
  }
  onSearchChange(event) {
    this.setState({searchTerm:event.target.value});
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {searchTerm,result} = this.state
    if (!result) {
      return null;
    }
    return (
      <div className = "page">
        <div className = "interactions">
          <div className = "App">
            <Search value={searchTerm} 
                    onChange={this.onSearchChange}
            >Search</Search>
          </div>
          <Table list = {result.hits}
                  pattern = {searchTerm}
                  onDismiss = {this.onDismiss}
          />
        </div>  
      </div>
    );
  }
}

const Search = ({value,onChange,children}) => 
      <form>
       {children} <input type="text" onChange = {onChange} value={value}/>
      </form>

const Table = ({list, pattern,onDismiss}) => 
      <div className = "table">
        {
          list
          .filter(item => item.title.toLowerCase().includes(pattern.toLocaleLowerCase()))
          .map(item => 
          <div key = {item.objectID} className="table-row">
            <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}>
              {item.author}
            </span>
            <span style={{ width: '10%' }}>
              {item.num_comments}
            </span>
            <span style={{ width: '10%' }}>
              {item.points}
            </span>
            <span style={{ width: '10%' }}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>)
        }
      </div>

const Button = ({onClick,className = '', children}) => 
      <button onClick = {onClick}
              className = {className}
              type = "button">
              {children}
      </button>

export default App;
