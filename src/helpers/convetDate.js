export const convertDate = (date) => {
  // Convert the input date string to a Date object
  const newDate = new Date(date);

  // Get the month abbreviation (e.g., "Jan", "Feb", etc.)
  const monthAbbreviation = newDate.toLocaleString("default", {
    month: "short",
  });

  // Get the day and year
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  // Concatenate the parts to form the desired format
  const formattedDate = `${monthAbbreviation} ${day}, ${year}`;

  return formattedDate;
};
