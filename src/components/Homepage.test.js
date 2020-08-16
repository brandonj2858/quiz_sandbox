import quizzes from '../data/quizzes';
import Homepage from './Homepage';
import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Incorrect', () => {
  it('should mark Incorrect', () => {
    const handleSelect = jest.fn();
    //const wrapper = mount(<Homepage  onClick={handleSelect} />)
    const wrapper = mount(<Homepage onClick={handleSelect} />);
    wrapper.find('.answer-div > li').first().simulate('click');

    expect(wrapper.text().includes('Incorrect...')).toBe(true);
  });
});

describe('Correct', () => {
  it('should mark Correct', () => {
    const handleSelect = jest.fn();

    const wrapper = mount(<Homepage onClick={handleSelect} />);
    wrapper.find('.answer-div > li').first().simulate('click');
    console.log(wrapper.find('.answer-div > li').first().text());
    expect(wrapper.text().includes('Correct!')).toBe(true);
  });
});
