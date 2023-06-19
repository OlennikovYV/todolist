function sortByFieldNumber(list, field) {
  list.sort((a, b) => a[field] - b[field]);
}

export default sortByFieldNumber;
