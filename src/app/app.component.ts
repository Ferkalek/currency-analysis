import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  template: `
    <app-dashboard />

    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}


// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Button } from 'primereact/button';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Toast } from 'primereact/toast';
// import { Card } from 'primereact/card';
// import { CurrencyTable } from './components/CurrencyTable';
// import { CurrencyData, ResponseType } from './models';
// import { currencyList } from './constants';
// import { safelyGetNestedProperty, updateDateToLocalTime } from './utils';
// import { fetchCurrencyItem } from './services';

// const App: React.FC = () => {
//   const [data, setData] = useState<CurrencyData[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const toast = useRef<Toast>(null);

//   const fetchCurrencyData = useCallback(async () => {  
//     setLoading(true);
//     try {
//       const responses: ResponseType[] = await Promise.all(
//         currencyList.map(currency => fetchCurrencyItem(currency))
//       );
  
//       const hasErrors = responses.some(res => res.error === true);
      
//       if (hasErrors) {
//         toast.current?.show({
//           severity: 'warn',
//           summary: 'Warning',
//           detail: 'Some currency data could not be loaded',
//           life: 1000
//         });
//       }
      
//       const processedData = responses.map((response, index) => {
//         const currencyLabel = response.currencyLabel || currencyList[index].label;
        
//         if ('error' in response && response.error === true) {
//           return {
//             basic: {},
//             currency: currencyLabel,
//             technical: 'Error',
//             summary: 'Failed to load',
//             averages: 'Error',
//             lastUpdateTime: ''
//           };
//         }
        
//         const responseData = response.data;
        
//         return {
//           basic: {...responseData},
//           currency: currencyLabel,
//           technical: safelyGetNestedProperty(responseData, 'indicators.summary.value', 'N/A'),
//           summary: safelyGetNestedProperty(responseData, 'summary', 'N/A'),
//           averages: safelyGetNestedProperty(responseData, 'movingAverages.summary.value', 'N/A'),
//           lastUpdateTime: responseData.lastUpdateTime ? updateDateToLocalTime(responseData.lastUpdateTime) : ''
//         };
//       });
      
//       setData(processedData);
      
//       // if (!hasErrors) {
//       //   toast.current?.show({
//       //     severity: 'success',
//       //     summary: 'Success',
//       //     detail: 'Currency data loaded successfully',
//       //     life: 500
//       //   });
//       // }
//     } catch (error) {
//       console.error('Error fetching currency data:', error);
//       toast.current?.show({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Failed to fetch currency data',
//         life: 1000
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCurrencyData()
//   }, [fetchCurrencyData]);

//   const cardHeader = (
//     <div className="flex align-items-center justify-content-between -mb-4 pt-4 px-4">
//       <h2 className="text-xl font-bold m-0">Currency Technical Analysis</h2>
//       <Button 
//         label="Fetch Data" 
//         icon="pi pi-refresh" 
//         onClick={fetchCurrencyData} 
//         loading={loading}
//         className="p-button-sm"
//       />
//     </div>
//   );

//   return (
//     <div className="px-4 py-2">
//       <Toast ref={toast} />
      
//       <Card header={cardHeader}>
//         {loading ? (
//           <div className="flex justify-content-center p-4">
//             <ProgressSpinner style={{ width: '50px', height: '50px' }} />
//           </div>
//         ) : (
//           <CurrencyTable
//             data={data}
//             loading={loading}
//           />
//         )}
//       </Card>
//     </div>
//   );
// };

// export default App;