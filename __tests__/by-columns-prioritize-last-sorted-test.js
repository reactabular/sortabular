import { byColumnsPrioritizeLastSorted } from '../src';

describe('sort.byColumnsPrioritizeLastSorted', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 0;

    const expected = {
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

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
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

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
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

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
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('updates position', function () {
    const selectedColumn = 1;
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };

    const expected = {
      0: {
        direction: 'asc',
        position: 1
      },
      [selectedColumn]: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('updates position while being sorted already', function () {
    const selectedColumn = 1;
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      },
      1: {
        direction: 'asc',
        position: 1
      }
    };

    const expected = {
      0: {
        direction: 'asc',
        position: 1
      },
      1: {
        direction: 'desc',
        position: 0
      }
    };
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('allows sorting order to be customized', function () {
    const sortingColumns = null;
    const sortingOrder = {
      FIRST: 'asc',
      asc: 'desc',
      desc: 'asc'
    };
    const selectedColumn = 1;

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

    const firstResult = byColumnsPrioritizeLastSorted({
      sortingColumns,
      sortingOrder,
      selectedColumn
    });
    const secondResult = byColumnsPrioritizeLastSorted({
      sortingColumns: firstResult,
      sortingOrder,
      selectedColumn
    });
    const thirdResult = byColumnsPrioritizeLastSorted({
      sortingColumns: secondResult,
      sortingOrder,
      selectedColumn
    });

    expect(firstResult).toEqual(ascExpected);
    expect(secondResult).toEqual(descExpected);
    expect(thirdResult).toEqual(ascExpected);
  });

  it('updates position after losing a column', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      0: {
        direction: 'desc',
        position: 0
      },
      1: {
        direction: 'asc',
        position: 1
      }
    };

    const expected = {
      1: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
  });

  it('returns sorting columns without a selected column', function () {
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumnsPrioritizeLastSorted({ sortingColumns });

    expect(result).toEqual(sortingColumns);
  });

  it('does not mutate original data', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      0: {
        direction: 'desc',
        position: 0
      },
      1: {
        direction: 'asc',
        position: 1
      }
    };

    const expected = {
      1: {
        direction: 'asc',
        position: 0
      }
    };
    const result = byColumnsPrioritizeLastSorted({ sortingColumns, selectedColumn });

    expect(result).toEqual(expected);
    expect(sortingColumns).toEqual({
      0: {
        direction: 'desc',
        position: 0
      },
      1: {
        direction: 'asc',
        position: 1
      }
    });
  });
});
