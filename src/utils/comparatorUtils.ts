export const percentageStringComparator = (valueA: string, valueB: string) => {
  const numA = parseFloat(valueA?.replace('%', ''));
  const numB = parseFloat(valueB?.replace('%', ''));

  if (isNaN(numA)) return 1; // Put invalid values at the end
  if (isNaN(numB)) return -1; // Put invalid values at the end
  return numA - numB;
};

export const numberComparator = (valueA: any, valueB: any) => {
  // Handle null, undefined, empty string cases
  if (!valueA && valueA !== 0) return 1;
  if (!valueB && valueB !== 0) return -1;
  if (!valueA && !valueB) return 0;

  const numA = Number(valueA);
  const numB = Number(valueB);

  if (isNaN(numA) && isNaN(numB)) {
    try {
      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();
      return strA.localeCompare(strB);
    } catch {
      return 0;
    }
  }

  if (isNaN(numA)) return 1; // Put invalid values at the end
  if (isNaN(numB)) return -1; // Put invalid values at the end

  return numA - numB;
};
