module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  equals: function (value1, value2, options) {
    if (value1 === value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
