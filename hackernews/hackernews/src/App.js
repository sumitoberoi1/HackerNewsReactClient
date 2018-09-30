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
const PARAM_PAGE = 'page=';
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
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  async fetchSearchTopStories(searchTerm,page = 0) {
    try {
      const response = await fetch(`${url}${searchTerm}&${PARAM_PAGE}${page}`);
      const result = await response.json();
      this.setSearchTopStories(result);
    } catch (e) {
      console.log(e)
    }
  }

  onDismiss(objectID) {
    const updatedHits = this.state.result.hits.filter(item=>item.objectID !== objectID);
    this.setState({
      result:{...this.state.result,hits:updatedHits}
    });
  }
  onSearchChange(event) {
    this.setState({searchTerm:event.target.value});
  }
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {searchTerm,result} = this.state
    const page = (result && result.page) || 0;
    return (
      <div className = "page">
        <div className = "interactions">
          <div className = "App">
            <Search value={searchTerm} 
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit}
            >Search</Search>
          </div>
          {result && <Table list = {result.hits}
                  onDismiss = {this.onDismiss}/>}
          <div className = "interactions">
            <Button onClick = {() => this.fetchSearchTopStories(searchTerm, page+1)}>More</Button>
          </div>
        </div>  
      </div>
    );
  }
}

const Search = ({value,onChange,children,onSubmit}) => 
      <form onSubmit={onSubmit}>
       {children} 
       <input type="text" onChange = {onChange} value={value}/>
       <button type="submit">{children}</button>
      </form>

const Table = ({list,onDismiss}) => 
      <div className = "table">
        {
          list
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
