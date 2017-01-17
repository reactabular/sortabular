/* eslint-disable react/prop-types */
import React from 'react';
import defaultStrategy from './default-strategy';

const order = ({
  getSortingColumns,
  props = {},
  strategy = defaultStrategy
}) => {
  if (!getSortingColumns) {
    throw new Error('order - Missing getSortingColumns!');
  }

  return (value, extra) => {
    const sortingColumns = getSortingColumns();
    const sortingColumn = (
      sortingColumns && sortingColumns[extra[strategy.fieldName]]
    ) || {};
    const sortingPosition = sortingColumn.position;

    return (
      {}.hasOwnProperty.call(sortingColumn, 'position') ?
        <span className="sort-order" {...props}>{sortingPosition + 1}</span> :
        null
    );
  };
};

export default order;
