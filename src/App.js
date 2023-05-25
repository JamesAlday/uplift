import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css'
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

function App() {
  const [providers, setProviders] = useState([{}])
  
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
      { field: 'id', headerName: 'ID', filter: false },
      { field: 'first_name', headerName: 'First Name' },
      { field: 'last_name', headerName: 'Last Name' },
      { field: 'sex' },
      { field: 'birth_date', headerName: 'Birth Date' },
      { field: 'rating', sortable: false },
      { field: 'primary_skills', headerName: 'Primary Skills' },
      { field: 'secondary_skill', headerName: 'Secondary Skill' },
      { field: 'company' },
      { 
        field: 'active',
        filter: 'agSetColumnFilter',
        filterParams: {
          values: ['true', 'false']
        }
      },
      { field: 'country' },
      { field: 'language' },
  ])

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains', 'notContains']
      }
    }
  });

  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));

      fetch('/providers', {
        method: 'post',
        body: JSON.stringify(params.request),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
      .then(result => result.json())
      .then(response => {
        params.success({rowData: response});
      })
      .catch(error => {
        console.error(error);
        params.fail();
      })
    }
  }

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);

  const onViewportChanged = useCallback((params) => {
    sizeToFit()
  });

  const onFilterChanged = (params) => {
    const setFilter = params.api.getFilterInstance('primary_skills');
    setFilter.refreshFilterValues();
  }
  
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <div className="button-bar">
          <button onClick={sizeToFit}>Size to Fit</button>
      </div>
      <div id="myGrid" style={{height:"100vh"}} className="ag-theme-alpine">
        <AgGridReact
               ref={gridRef}
               rowData={providers}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
               // animateRows={true}
               rowSelection='multiple'
               onViewportChanged={onViewportChanged}
               rowModelType='serverSide'
               serverSideDatasource={datasource}
               onFilterChanged = {onFilterChanged}
        >
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
