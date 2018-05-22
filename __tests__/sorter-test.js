import orderBy from 'lodash/orderBy';
import reverse from 'lodash/reverse';
import find from 'lodash/find';
import { sorter } from '../src';

describe('sort.sorter', function () {
  it('sorts ascending', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(rows);
  });

  it('sorts descending', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'desc',
        position: 0
      }
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(reverse(rows));
  });

  it('sorts ascending and descending', function () {
    const columns = [{
      property: 'name',
      header: {}
    }, {
      property: 'position',
      header: {}
    }];
    const rows = [
      {
        name: 'joe',
        position: 'boss'
      },
      {
        name: 'adam',
        position: 'boss'
      },
      {
        name: 'mike',
        position: 'employee'
      }
    ];
    const expected = [
      {
        name: 'joe',
        position: 'boss'
      },
      {
        name: 'adam',
        position: 'boss'
      },
      {
        name: 'mike',
        position: 'employee'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'desc',
        position: 1
      },
      1: {
        direction: 'asc',
        position: 0
      }
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(expected);
  });

  it('returns rows if there is no sorting information', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const result = sorter({ columns, sort: orderBy })(rows);

    expect(result).toEqual(rows);
  });

  it('returns rows if only columns and sort are passed', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const result = sorter({ columns, sort: orderBy })(rows);

    expect(result).toEqual(rows);
  });

  it('sorts case-insensitively', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 'crep'
      },
      {
        test: 'Bllop'
      },
      {
        test: 'Dart'
      }
    ];
    const expected = [
      {
        test: 'Bllop'
      },
      {
        test: 'crep'
      },
      {
        test: 'Dart'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(expected);
  });

  it('sorts numbers', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 3
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(rows);
  });

  it('sorts resolved numbers', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];

    const rows = [
      { _test: 2 },
      { _test: 0 }
    ];

    const expected = [
      { _test: 0 },
      { _test: 2 }
    ];

    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(expected);
  });

  it('does not fail if property is missing', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 3
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(rows);
  });

  it('resolves fields', function () {
    const countries = {
      de: 'Germany',
      fi: 'Finland'
    };
    const rows = [
      {
        id: 0,
        country: 'de',
        _country: countries.de
      },
      {
        id: 1,
        country: 'fi',
        _country: countries.fi
      }
    ];
    const expected = [
      {
        id: 1,
        country: 'fi',
        _country: countries.fi
      },
      {
        id: 0,
        country: 'de',
        _country: countries.de
      }
    ];
    const columns = [
      {
        property: 'country'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(expected);
  });

  it('allows getColumn to be customized', function () {
    const columns = [{
      property: 'test',
      header: {}
    }];
    const rows = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = {
      test: {
        direction: 'asc',
        position: 0
      }
    };
    const getColumn = (columns, property) => find(columns, { property }); // eslint-disable-line max-len, no-shadow

    const result = sorter({
      columns, sortingColumns, sort: orderBy, getColumn
    })(rows);

    expect(result).toEqual(rows);
  });

  it('does not crash with only header data', function () {
    const columns = [{
      header: {
        label: 'demo'
      }
    }];
    const rows = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(rows);

    expect(result).toEqual(rows);
  });


  it('throws an error if columns are not passed', function () {
    expect(sorter()).toThrow(Error);
  });

  it('throws an error if "sort" argument is not passed', function () {
    const columns = [{
      header: {
        label: 'demo'
      }
    }];
    expect(sorter(columns)).toThrow(Error);
  });
});
