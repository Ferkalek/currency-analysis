/**
 * Функція для визначення кольору тегу для технічних індикаторів
 */
export const getSeverity = (value: string): 'success' | 'danger' | '' => {
  switch (value.toLowerCase()) {
    case 'strong buy':
      return 'success';
    case 'strong sell':
      return 'danger';
    default:
      return '';
  }
};
