// Function to format currency
export const currency = (amount) => {
  if (amount == null) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Function to return Tailwind CSS classes for condition badges
// MODIFICATION: Added distinct classes for light and dark modes.
export const conditionColor = (condition) => {
  switch (condition) {
    case 'New':
      return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100';
    case 'Like New':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100';
    case 'Good':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
    case 'Acceptable':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
  }
};