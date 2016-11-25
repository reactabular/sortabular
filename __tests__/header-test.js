/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { byColumn, header } from '../src';

describe('sort.header', function () {
  it('throws an error if sortable is not passed', function () {
    expect(
      header.bind(null, {
        getSortingColumns: () => {}
      })
    ).toThrow(Error);
  });

  it('throws an error if getSortingColumns is not passed', function () {
    expect(
      header.bind(null, {
        sortable: byColumn
      })).toThrow(Error);
  });

  it('renders value by default', function () {
    const expectedValue = 'foobar';
    const headerTransform = header({
      getSortingColumns: () => {},
      sortable: byColumn
    })(expectedValue, {});
    const renderedHeader = TestUtils.renderIntoDocument(
      React.createElement(Wrapper, {}, headerTransform)
    );
    const receivedValue = TestUtils.findRenderedDOMComponentWithClass(
      renderedHeader, 'sort-value'
    );

    expect(receivedValue.innerHTML).toEqual(expectedValue);
  });

  it('renders order if a column is selected', function () {
    const position = 0;
    const headerTransform = header({
      getSortingColumns: () => ({
        0: {
          direction: 'asc',
          position
        }
      }),
      sortable: byColumn
    })('foo', { columnIndex: 0 });
    const renderedHeader = TestUtils.renderIntoDocument(
      React.createElement(Wrapper, {}, headerTransform)
    );
    const order = TestUtils.findRenderedDOMComponentWithClass(
      renderedHeader, 'sort-order'
    );

    expect(order.innerHTML).toEqual((position + 1).toString());
  });

  it('allows customization through the props prop', function () {
    const color = 'red';
    const props = {
      container: {
        style: {
          color
        }
      },
      value: {
        style: {
          color
        }
      },
      order: {
        style: {
          color
        }
      }
    };

    const headerTransform = header({
      getSortingColumns: () => ({
        0: {
          direction: 'asc',
          position: 0
        }
      }),
      sortable: byColumn,
      props
    })('foo', { columnIndex: 0 });
    const renderedHeader = TestUtils.renderIntoDocument(
      React.createElement(Wrapper, {}, headerTransform)
    );
    const container = TestUtils.findRenderedDOMComponentWithClass(
      renderedHeader, 'sort-container'
    );
    const value = TestUtils.findRenderedDOMComponentWithClass(
      renderedHeader, 'sort-value'
    );
    const order = TestUtils.findRenderedDOMComponentWithClass(
      renderedHeader, 'sort-order'
    );

    expect(container.style.color).toEqual(color);
    expect(value.style.color).toEqual(color);
    expect(order.style.color).toEqual(color);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return React.createElement('div', {}, this.props.children);
  }
}
