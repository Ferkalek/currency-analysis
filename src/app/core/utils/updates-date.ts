import { format, toZonedTime } from 'date-fns-tz';

export const updateDateToLocalTime = (date: string): string => {
    // 1st solution without lib
    // Додаємо "Z", щоб вказати, що це UTC
    // const serverDate = new Date(date + "Z");

    // Відображення в локальному часовому поясі
    // Форматує дату/час відповідно до локального часового поясу
    // const formattedDate = serverDate.toLocaleString();


    // 2nd solution
    const serverDate = new Date(date + "Z");
    
    // Конвертуємо в локальний часовий пояс
    // Замініть на ваш часовий пояс
    const localDate = toZonedTime(serverDate, 'Europe/Warsaw');
    const formattedDate = format(localDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Europe/Warsaw' });

    return formattedDate;
}
