/* eslint-disable react/prop-types */
import React from 'react';
import defaultStrategy from './default-strategy';
import order from './order';

const header = ({
  sortable,
  getSortingColumns,
  props = {
    container: {},
    value: {},
    order: {}
  },
  strategy = defaultStrategy
}) => {
  if (!getSortingColumns) {
    throw new Error('header - Missing getSortingColumns!');
  }

  return (value, extra) => (
    <div
      className="sort-container"
      {...props.container}
    >
      <span
        className="sort-value"
        {...props.value}
      >
        {value}
      </span>
      {order({
        getSortingColumns,
        props: props.order,
        strategy
      })(value, extra)}
      {sortable ? React.createElement(
        'span',
        sortable(
          value,
          extra
        )
      ) : null}
    </div>
  );
};

export default header;
