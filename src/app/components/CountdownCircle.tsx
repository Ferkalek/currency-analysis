import { useState, useEffect, useRef } from 'react';

const CountdownCircle = (dateString: string) => {
  const [secondsElapsed, setSecondsElapsed] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Розрахунок початкової різниці в секундах
    const calculateInitialSeconds = (): number => {
      const inputDate = new Date(dateString.replace(' ', 'T'));
      const currentDate = new Date();
      const diffInSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);
      
      // Перевіряємо, чи не більше 60 секунд пройшло
      if (diffInSeconds >= 60 || diffInSeconds < 0) {
        setIsVisible(false);
        return 0;
      }
      
      return diffInSeconds;
    };

    const initialSeconds = calculateInitialSeconds();
    setSecondsElapsed(initialSeconds);

    // Якщо компонент має бути видимим, запускаємо таймер
    if (initialSeconds < 60 && initialSeconds >= 0) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed(prev => {
          if (prev === null) return null;
          
          const newValue = prev + 1;
          if (newValue >= 60) {
            // Якщо досягли 60 секунд, зупиняємо таймер і ховаємо компонент
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsVisible(false);
            return null;
          }
          return newValue;
        });
      }, 1000);
    }

    // Очищення інтервалу при розмонтуванні компонента
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dateString]);

  // Якщо компонент не повинен бути видимим, повертаємо null
  if (!isVisible || secondsElapsed === null) {
    return null;
  }

  // Радіус кола
  const radius = 15;
  // Загальна довжина контуру кола
  const circumference = 2 * Math.PI * radius;
  // Довжина зафарбованого сегмента (в залежності від пройденого часу)
  const filledLength = (secondsElapsed / 60) * circumference;

  return (
    <div className="countdown-circle" style={{ width: '36px', height: '36px', position: 'relative' }}>
      <svg width="36" height="36" viewBox="0 0 36 36">
        {/* Фонове коло */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth="2.5"
        />
        {/* Прогрес-коло */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="transparent"
          stroke="#4caf50"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filledLength}
          transform="rotate(-90, 18, 18)" // Починаємо з 12 годин
        />
      </svg>
      {/* Текст всередині кола */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {secondsElapsed}
      </div>
    </div>
  );
};

export default CountdownCircle;