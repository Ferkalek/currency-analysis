import { mapResult } from "./maps-result";

/**
 * Функція для безпечного отримання вкладених властивостей
 */
export const safelyGetNestedProperty = (obj: any, path: string, defaultValue = 'N/A') => {
    try {
      // Розбиваємо шлях на окремі частини
      const parts = path.split('.');
      let result = obj;
      
      // Ітеруємо по частинах шляху
      for (const part of parts) {
        if (result === null || result === undefined || typeof result !== 'object') {
          return defaultValue;
        }
        result = result[part];
      }
      
      return result !== null && result !== undefined ? mapResult(result) : defaultValue;
    } catch (error) {
      console.error(`Error accessing path ${path}:`, error);
      return defaultValue;
    }
  };
