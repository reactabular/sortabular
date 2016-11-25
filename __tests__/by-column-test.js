import { byColumn } from '../src';

describe('sort.byColumn', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 1;

    const expected = {
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('sorts ascending by default with an empty array', function () {
    const sortingColumns = [];
    const selectedColumn = 0;

    const expected = {
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('sorts descending if ascending the same first', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };

    const expected = {
      [selectedColumn]: {
        direction: 'desc',
        position: 0
      }
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('removes sorting if descending the same first', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      [selectedColumn]: {
        direction: 'desc',
        position: 0
      }
    };

    const expected = {};
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('sorts ascending if ascending another one first', function () {
    const selectedColumn = 0;
    const otherColumn = 1;
    const sortingColumns = {
      [otherColumn]: {
        direction: 'asc',
        position: 0
      }
    };

    const expected = {
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('allows sorting order to be customized', function () {
    const sortingColumns = null;
    const sortingOrder = {
      FIRST: 'asc',
      asc: 'desc',
      desc: 'asc'
    };
    const selectedColumn = 0;

    const ascExpected = {
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };
    const descExpected = {
      [selectedColumn]: {
        direction: 'desc',
        position: 0
      }
    };
    const firstResult = byColumn({ sortingColumns, sortingOrder, selectedColumn });
    const secondResult = byColumn({
      sortingColumns: firstResult,
      sortingOrder,
      selectedColumn
    });
    const thirdResult = byColumn({
      sortingColumns: secondResult,
      sortingOrder,
      selectedColumn
    });

    expect(firstResult).toEqual(ascExpected);
    expect(secondResult).toEqual(descExpected);
    expect(thirdResult).toEqual(ascExpected);
  });

  it('returns sorting columns without a selected column', function () {
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumn({ sortingColumns });

    expect(result).toEqual(sortingColumns);
  });
});
