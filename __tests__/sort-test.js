import { sort, strategies } from '../src';

describe('sort.sort', function () {
  it('defaults to sort-none class', function () {
    const _sorter = sort();
    const result = _sorter('testValue', { columnIndex: 0 });

    expect(result.className).toEqual('sort sort-none');
  });

  it('sets sorting class', function () {
    const testColumnIndex = 0;
    const sortDirection = 'asc';
    const _sorter = sort({
      getSortingColumns() {
        return {
          [testColumnIndex]: {
            direction: sortDirection,
            position: 0
          }
        };
      }
    });
    const result = _sorter('testValue', {
      columnIndex: testColumnIndex
    });

    expect(result.className).toEqual(`sort sort-${sortDirection}`);
  });

  it('triggers sorting on click', function () {
    const testColumnIndex = 0;
    let sorted;
    const _sorter = sort({
      onSort(columnIndex) {
        sorted = columnIndex;
      }
    });
    const result = _sorter('testValue', {
      columnIndex: testColumnIndex
    });

    result.onClick();

    expect(sorted).toEqual(testColumnIndex);
  });

  it('triggers sorting on enter key', function () {
    const testColumnIndex = 0;
    let sorted;
    const _sorter = sort({
      onSort(columnIndex) {
        sorted = columnIndex;
      }
    });
    const result = _sorter('testValue', {
      columnIndex: testColumnIndex
    });

    result.onKeyDown({ keyCode: 13 });

    expect(sorted).toEqual(testColumnIndex);
  });

  it('does not triggers sorting on enter key if disableKeyboard=true', function () {
    const testColumnIndex = 0;
    const _sorter = sort({
      disableKeyboard: true,
      onSort() {}
    });
    const result = _sorter('testValue', {
      columnIndex: testColumnIndex
    });

    expect(result.onKeyDown).toBeUndefined();
  });

  it('does not trigger sorting on other keyDown events', function () {
    const testColumnIndex = 0;
    let sorted;
    const _sorter = sort({
      onSort(columnIndex) {
        sorted = columnIndex;
      }
    });
    const result = _sorter('testValue', {
      columnIndex: testColumnIndex
    });

    result.onKeyDown({ keyCode: 32 });

    expect(sorted).toBeFalsy();
  });

  it('allows strategy to be customized', function () {
    const testProperty = 'foobar';
    const sortDirection = 'asc';
    const _sorter = sort({
      getSortingColumns() {
        return {
          [testProperty]: {
            direction: sortDirection,
            position: 0
          }
        };
      },
      strategy: strategies.byProperty
    });
    const result = _sorter('testValue', {
      property: testProperty
    });

    expect(result.className).toEqual(`sort sort-${sortDirection}`);
  });
});
