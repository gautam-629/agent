import moment from 'moment';

export function convertTimestampToDateTime(timestamp: string | number): string {
  // Convert to decimal timestamp if the input is a string
  const decimalTimestamp: number = typeof timestamp === 'string' ? parseInt(timestamp, 16) : timestamp;
  
  // Convert to date object
  const dateObject: Date = new Date(decimalTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  
  // Format the date using moment.js
  const formattedDate: string = moment(dateObject).format('YYYY-MM-DD HH:mm:ss');
  
  return formattedDate;
}


export function convertDateForSearch(originalDate: string | Date | null | undefined): string | null {
  if (originalDate === null || originalDate === undefined) {
    return null;
  }
  
  const originalDateString = typeof originalDate === 'string' ? originalDate : originalDate.toString();
  const formattedDate = moment(originalDateString, 'ddd MMM DD YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  return formattedDate;
}