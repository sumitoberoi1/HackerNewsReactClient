import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import Search from '../Search/index';
import renderer from 'react-test-renderer';
import { Button } from '../Button/index';
import Enzyme, {shallow}  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../Table/index';
Enzyme.configure({ adapter: new Adapter() });

describe(`App`,() => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot',() => {
    const component = renderer.create(
      <App />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
  });
  test('has a valid snapshot',() => {
    const component = renderer.create(
      <Search>Search</Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give Me More</Button>,div);
  });
  test('has a valid snapshot',() => {
    const component = renderer.create(
      <Button>Give Me More</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
      sortKey: 'TITLE',
      isSortReverse:false,
  };
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props}/> ,div);
  });
  test('has a valid snapshot',() => {
    const component = renderer.create(
      <Table { ...props}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('shows two item in list',() => {
    const element = shallow(<Table {...props} />)
    expect(element.find('.table-row').lenth).toBe(2);
  })
});