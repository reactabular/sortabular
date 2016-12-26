import result from 'lodash/result';
import get from 'lodash/get';
import defaultStrategy from './default-strategy';

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
const sorter = ({
  columns,
  sortingColumns,
  sort,
  strategy = defaultStrategy
} = {}) => (data) => {
  if (!columns) {
    throw new Error('sort.sorter - Missing columns!');
  }

  if (!sortingColumns) {
    return data;
  }

  const columnIndexList = new Array(sortingColumns.length);
  const orderList = new Array(sortingColumns.length);

  Object.keys(sortingColumns).forEach((sortingColumnKey) => {
    const realColumn = strategy.getColumn(columns, sortingColumnKey) || {};
    const sortingColumn = sortingColumns[sortingColumnKey];

    columnIndexList[sortingColumn.position] = (row) => {
      const property = realColumn.property;
      const value = row[property];
      // Pick resolved value by convention
      const resolvedValue = get(row, `_${property}`, value);

      return result(resolvedValue, 'toLowerCase', resolvedValue);
    };

    orderList[sortingColumn.position] = sortingColumn.direction;
  });

  return sort(data, columnIndexList, orderList);
};

export default sorter;
