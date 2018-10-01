import React from 'react';
import PropTypes from 'prop-types';


const Search = ({value,onChange,children,onSubmit}) => 
      <form onSubmit={onSubmit}>
       {children} 
       <input type="text" onChange = {onChange} value={value}/>
       <button type="submit">{children}</button>
      </form>
Search.protoTypes = {
      value:PropTypes.string,
      onChange:PropTypes.func,
      children:PropTypes.node,
      onSubmit:PropTypes.func
}
export default Search;