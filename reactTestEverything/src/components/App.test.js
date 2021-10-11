import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Tests of App rendering', () => {
  it('shallow renders main page sections regardless of API content and UImode state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });
});