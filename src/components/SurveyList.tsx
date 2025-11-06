import { useEffect, useState } from "react";
import type { Survey } from "../types";
import { getSurveys } from "../services/SurveyApi";
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';

function SurveyList(){

    const [surveys, setSurveys] = useState<Survey[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getSurveys();
    },[]);

    const rows: GridRowsProp = [
        { id: 1, name: 'Data Grid', description: 'the Community version' },
        { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
        { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
    ];

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Kysely', width: 200 },
        { field: 'description', headerName: 'Kuvaus', width: 300 },
    ];

    return(
        <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
    );
}

export default SurveyList;