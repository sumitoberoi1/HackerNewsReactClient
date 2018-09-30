import React, { Component } from 'react';
import Search from '../Search/index';
import Table from '../Table/index';
import Button from '../Button';
import './App.css';


import { 
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
}  from '../constants';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results:null,
      searchKey:'',
      searchTerm : DEFAULT_QUERY,
      error:null
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    const {hits, page} = result;
    const {searchKey, results} = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits: [];
    const updatedHits = [...oldHits,...hits];
    this.setState({
      results: {
        ...results,
        [searchKey]: {hits:updatedHits,page}
      }
    })
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  async fetchSearchTopStories(searchTerm,page = 0) {
    try {
      console.log(`API url: ${url}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`);
      const response = await fetch(`${url}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`);
      const result = await response.json();
      this.setState({searchKey:searchTerm});
      this.setSearchTopStories(result);
    } catch (e) {
      console.log(e);
        this.setState({error:e})
    }
  }

  onDismiss(objectID) {
    const {searchKey, results} = this.state;
    const { hits, page} = results[searchKey];

    const updatedHits = hits.filter(item=>item.objectID !== objectID);
    this.setState({
      results:{...results,
        [searchKey]: {hits:updatedHits, page:page}}
    });
  }

  onSearchChange(event) {
    this.setState({searchTerm:event.target.value});
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {searchTerm,results,searchKey, error} = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    if (error) {
      
    }
    return (
      <div className = "page">
        <div className = "interactions">
          <div className = "App">
            <Search value={searchTerm} 
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit}
            >Search</Search>
          </div>
          {error 
          ? <div className ="interactions">
              <p>Something went wrong</p>
            </div>
            :<Table list = {list}
                  onDismiss = {this.onDismiss}/>}
            <div className = "interactions">
              <Button onClick = {() => this.fetchSearchTopStories(searchKey, page+1)}>More</Button>
            </div>
        </div>  
      </div>
    );
  }
}



export default App;
