import classNames from 'classnames';
import defaultStrategy from './default-strategy';

const sort = ({
  event = 'onClick',
  getSortingColumns = () => [],
  onSort = () => {},
  strategy = defaultStrategy,
  disableKeyboard = false,
} = {}) => (_value, extra, { className, ...props } = {}) => {
  const sortingColumns = getSortingColumns();
  const field = extra[strategy.fieldName];
  let headerClass = 'sort sort-none';

  // Check against undefined to allow zero
  if (sortingColumns[field] !== undefined) {
    headerClass = `sort sort-${sortingColumns[field].direction}`;
  }

  const keyboardEventHandler = disableKeyboard ? {} : {
    onKeyDown: (e) => { if (e.keyCode === 13) { onSort(field) }}
  }

  return {
    ...props,
    className: classNames(className, headerClass),
    [event]: () => onSort(field),
    ...keyboardEventHandler,
  };
};

export default sort;
