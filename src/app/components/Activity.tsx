import { Tag } from 'primereact/tag';
import { CurrencyData } from '../models';
import { getSeverity } from '../utils';

// Компонент для відображення значення в таблиці як Tag
export const Activity = (rowData: CurrencyData, field: Exclude<keyof CurrencyData, 'basic'>) => {
  const value = rowData[field];
  const severity = getSeverity(value as string);
  return (
    severity ?(<Tag value={value as string} severity={severity} />) : (<span>{value as string}</span>)
  );
};
