/**
 * @param {*} rows The rows of data to compare against and filter down
 * @param {*} columnIds The names of the table column (set when configuring react-table)
 * @param {*} value What the user set their domain status filters to
 */
const customDomainStatusFilter = function(rows, columnIds, value) {
  const appliedFilters = value;
  const tableColumnName = columnIds[0];
  const noneSelected = Object.keys(appliedFilters)
    .map(i => appliedFilters[i])
    .every(i => i === false);

  // none = all, dont filter
  if (noneSelected) {
    return rows;
  }

  const mappedRows = rows
    .map(row => {
      let trueForAtleastOne = 0;
      Object.keys(appliedFilters).forEach(status => {
        if (status !== 'blocked' && row.values[tableColumnName]['blocked']) return;
        //if a domain is blocked we don't have to compare other fields
        else if (appliedFilters[status] && row.values[tableColumnName][status]) {
          trueForAtleastOne++;
          return;
        }
      });
      return trueForAtleastOne > 0 ? row : false;
    })
    .filter(Boolean);

  return mappedRows;
};

export default customDomainStatusFilter;
