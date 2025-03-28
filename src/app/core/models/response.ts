import { AxiosResponse } from 'axios';

export interface ErrorResponse {
    data: null;
    error: boolean;
    currencyLabel: string;
}
  
export type ResponseType = (AxiosResponse<any> & { error?: never; currencyLabel?: never }) | ErrorResponse;
