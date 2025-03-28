import { severity } from "../constants";

export const mapResult = (val: string): string => {
    return severity?.[val] || 'N/A';
};
  