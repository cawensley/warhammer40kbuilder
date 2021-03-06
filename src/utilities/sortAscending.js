export function numberAscend(a, b) {
  const number1 = a.SortOrder;
  const number2 = b.SortOrder;

  let comparison = 0;
  if (number1 > number2) {
    comparison = 1;
  } else if (number1 < number2) {
    comparison = -1;
  }
  return comparison;
}

export function nameAscend(a, b) {
  const NameA = a.Name.toUpperCase();
  const NameB = b.Name.toUpperCase();

  let comparison = 0;
  if (NameA > NameB) {
    comparison = 1;
  } else if (NameA < NameB) {
    comparison = -1;
  }
  return comparison;
}
