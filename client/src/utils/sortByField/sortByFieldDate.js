function sortByFieldDate(list, field) {
  list.sort((a, b) => new Date(a[field]) - new Date(b[field]));
}

export default sortByFieldDate;
