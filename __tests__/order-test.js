/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { order } from '../src';

describe('sort.order', function () {
  it('throws an error if getSortingColumns is not passed', function () {
    expect(
      order.bind(null, {})).toThrow(Error);
  });

  it('renders order if a column is selected', function () {
    const position = 0;
    const headerOrder = order({
      getSortingColumns: () => ({
        0: {
          direction: 'asc',
          position
        }
      })
    })('foo', { columnIndex: 0 });
    const renderedHeader = TestUtils.renderIntoDocument(
      React.createElement(Wrapper, {}, headerOrder)
    );
    const sortOrder = TestUtils.findRenderedDOMComponentWithClass(
      renderedHeader, 'sort-order'
    );

    expect(sortOrder.innerHTML).toEqual((position + 1).toString());
  });

  it('allows customization through the props prop', function () {
    const color = 'red';
    const props = {
      style: {
        color
      }
    };

    const headerOrder = order({
      getSortingColumns: () => ({
        0: {
          direction: 'asc',
          position: 0
        }
      }),
      props
    })('foo', { columnIndex: 0 });
    const renderedOrder = TestUtils.renderIntoDocument(
      React.createElement(Wrapper, {}, headerOrder)
    );
    const sortOrder = TestUtils.findRenderedDOMComponentWithClass(
      renderedOrder, 'sort-order'
    );

    expect(sortOrder.style.color).toEqual(color);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return React.createElement('div', {}, this.props.children);
  }
}
