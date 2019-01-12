import React from 'react';

import { shallow } from 'enzyme';
import Footer from './index';

describe('Footer Components', () => {
  it('renders', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.footer')).toHaveLength(1);
  });
});
