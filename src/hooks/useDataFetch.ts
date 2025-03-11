"use client";

import Papa from 'papaparse';
import { useEffect, useState } from 'react';

export interface EVData {
  VIN: string;
  County: string;
  City: string;
  State: string;
  'Postal Code': string;
  'Model Year': number;
  Make: string;
  Model: string;
  'Electric Vehicle Type': string;
  'Clean Alternative Fuel Vehicle (CAFV)': string;
  'Electric Range': number;
  'Base MSRP': number;
  'Legislative District': string;
  'DOL Vehicle ID': string;
  'Vehicle Location': string;
  'Electric Utility': string;
  '2020 Census Tract': string;
  [key: string]: any;
}

export const useDataFetch = () => {
  const [data, setData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/Electric_Vehicle_Population_Data.csv');
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true, 
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data as EVData[]);
            setLoading(false);
          },
          error: (error) => {
            setError(error);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};