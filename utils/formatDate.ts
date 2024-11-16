const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const date = new Date(dateString);

  // Return a formatted date, or an empty string if the date is invalid
  return isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, options);
};

export default formatDate;
