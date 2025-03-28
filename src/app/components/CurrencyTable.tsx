import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CurrencyData, CurrencyTableProps } from '../models';
import { Activity } from './Activity';
import { CopyCurrencyBtn } from './CopyCurrencyBtn';
import CountdownCircle from './CountdownCircle';
import { checkTradeRisks } from '../utils';

export const CurrencyTable: React.FC<CurrencyTableProps> = ({ data, loading }) => {
  const isShownCountdown = (data: CurrencyData): boolean => {
    return (data.technical === 'Strong Buy' && data.summary === 'Strong Buy' && data.averages === 'Strong Buy') ||
    (data.technical === 'Strong Sell' && data.summary === 'Strong Sell' && data.averages === 'Strong Sell');
  }

  return (
    <DataTable 
      value={data}
      dataKey="currency"
      emptyMessage="No data available. Click the button to fetch data."
      loading={loading}
      className="p-datatable-sm"
      stripedRows
    >
      <Column
        field="currency"
        header="Currency"
        body={(rowData) => CopyCurrencyBtn(rowData.currency)}
        />
      <Column 
        field="technical" 
        header="Technical" 
        body={(rowData) => Activity(rowData, 'technical')}
      />
      <Column
        field="summary"
        header="Summary"
        body={(rowData) => Activity(rowData, 'summary')}
      />
      <Column 
        field="averages" 
        header="Averages" 
        body={(rowData) => Activity(rowData, 'averages')}
      />
      <Column 
        field="timeRemaining" 
        header="Remains"
        body={(rowData) => isShownCountdown(rowData) ? CountdownCircle(rowData.lastUpdateTime) : ''}
      />
      <Column 
        field="lastUpdateTime" 
        header="Updated"
        body={(rowData) => rowData.lastUpdateTime.substr(11)}
      />
      <Column 
        headerStyle={{maxWidth: '30rem'}}
        field="risk" 
        header="Risk"
        body={(rowData) => isShownCountdown(rowData) ? checkTradeRisks(rowData.basic) : '' }
      />
    </DataTable>
  );
};