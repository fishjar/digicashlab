export const groupBy = ( array, key) => {
  const groups = {};
  array.forEach(function (o) {
    const group = o[key];
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (item) {
    return {
      by: item,
      list: groups[item],
      len: groups[item].length
    };
  });
};

export const compareBy = (propertyName) => {
  return (object1, object2) => {
    const value1 = object1[propertyName];
    const value2 = object2[propertyName];

    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }
};
