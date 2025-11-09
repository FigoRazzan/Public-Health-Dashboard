import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export interface CovidDataRow {
  Date_reported: string;
  Country_code: string;
  Country: string;
  WHO_region: string;
  New_cases: number;
  Cumulative_cases: number;
  New_deaths: number;
  Cumulative_deaths: number;
}

export interface CovidStats {
  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  cfr: number;
  casesTrend: number;
  deathsTrend: number;
}

export interface TrendData {
  date: string;
  kasusHarian: number;
  kematian: number;
}

export interface RegionData {
  name: string;
  value: number;
}

export interface AgeData {
  age: string;
  cases: number;
}

export function useCovidData() {
  const [data, setData] = useState<CovidDataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/WHO-COVID-19-global-daily-data.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data as CovidDataRow[];
            setData(parsedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError('Failed to load CSV file');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const getStats = (): CovidStats => {
    if (data.length === 0) {
      return {
        totalCases: 0,
        totalDeaths: 0,
        totalRecovered: 0,
        cfr: 0,
        casesTrend: 0,
        deathsTrend: 0,
      };
    }

    // Get latest data (most recent date)
    const latestDate = data.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    const latestData = data.filter(row => row.Date_reported === latestDate);
    
    const totalCases = latestData.reduce((sum, row) => sum + (row.Cumulative_cases || 0), 0);
    const totalDeaths = latestData.reduce((sum, row) => sum + (row.Cumulative_deaths || 0), 0);
    
    // Estimate recovered (approximately 95% of cases minus deaths)
    const totalRecovered = Math.round(totalCases * 0.95 - totalDeaths);
    
    // Calculate CFR (Case Fatality Rate)
    const cfr = totalCases > 0 ? (totalDeaths / totalCases) * 100 : 0;

    // Calculate trend (compare last 7 days with previous 7 days)
    const dates = [...new Set(data.map(row => row.Date_reported))].sort().reverse();
    const last7Days = dates.slice(0, 7);
    const prev7Days = dates.slice(7, 14);

    const last7Cases = data
      .filter(row => last7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_cases || 0), 0);

    const prev7Cases = data
      .filter(row => prev7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_cases || 0), 0);

    const last7Deaths = data
      .filter(row => last7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_deaths || 0), 0);

    const prev7Deaths = data
      .filter(row => prev7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_deaths || 0), 0);

    const casesTrend = prev7Cases > 0 ? ((last7Cases - prev7Cases) / prev7Cases) * 100 : 0;
    const deathsTrend = prev7Deaths > 0 ? ((last7Deaths - prev7Deaths) / prev7Deaths) * 100 : 0;

    return {
      totalCases,
      totalDeaths,
      totalRecovered,
      cfr,
      casesTrend,
      deathsTrend,
    };
  };

  // Get trend data for last 6 months
  const getTrendData = (): TrendData[] => {
    if (data.length === 0) return [];

    const dates = [...new Set(data.map(row => row.Date_reported))].sort().reverse();
    const last6Months = dates.slice(0, 180); // Approximately 6 months

    // Group by month
    const monthlyData = new Map<string, { cases: number; deaths: number }>();

    data
      .filter(row => last6Months.includes(row.Date_reported))
      .forEach(row => {
        const month = row.Date_reported.substring(0, 7); // YYYY-MM
        const existing = monthlyData.get(month) || { cases: 0, deaths: 0 };
        monthlyData.set(month, {
          cases: existing.cases + (row.New_cases || 0),
          deaths: existing.deaths + (row.New_deaths || 0),
        });
      });

    return Array.from(monthlyData.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
      .map(([month, stats]) => ({
        date: new Date(month + '-01').toLocaleDateString('id-ID', { month: 'short' }),
        kasusHarian: stats.cases,
        kematian: stats.deaths,
      }));
  };

  // Get region distribution
  const getRegionData = (): RegionData[] => {
    if (data.length === 0) return [];

    const latestDate = data.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    const latestData = data.filter(row => row.Date_reported === latestDate);

    const regionMap = new Map<string, number>();
    latestData.forEach(row => {
      const region = row.WHO_region || 'Unknown';
      regionMap.set(region, (regionMap.get(region) || 0) + (row.Cumulative_cases || 0));
    });

    const regionNames: Record<string, string> = {
      'AFR': 'Africa',
      'AMR': 'Americas',
      'EMR': 'Eastern Mediterranean',
      'EUR': 'Europe',
      'SEAR': 'South-East Asia',
      'WPR': 'Western Pacific',
    };

    return Array.from(regionMap.entries())
      .map(([region, value]) => ({
        name: regionNames[region] || region,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  // Get age distribution (simulated based on WHO patterns)
  const getAgeData = (): AgeData[] => {
    if (data.length === 0) return [];

    const stats = getStats();
    const totalCases = stats.totalCases;

    // WHO COVID-19 age distribution patterns (approximate)
    return [
      { age: '0-17', cases: Math.round(totalCases * 0.04) },
      { age: '18-30', cases: Math.round(totalCases * 0.16) },
      { age: '31-45', cases: Math.round(totalCases * 0.23) },
      { age: '46-60', cases: Math.round(totalCases * 0.34) },
      { age: '60+', cases: Math.round(totalCases * 0.23) },
    ];
  };

  // Get latest table data
  const getTableData = (limit: number = 10) => {
    if (data.length === 0) return [];

    const latestDate = data.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    return data
      .filter(row => row.Date_reported === latestDate)
      .sort((a, b) => (b.Cumulative_cases || 0) - (a.Cumulative_cases || 0))
      .slice(0, limit)
      .map(row => ({
        date_reported: row.Date_reported,
        country_code: row.Country_code,
        country: row.Country,
        who_region: row.WHO_region,
        new_cases: row.New_cases || 0,
        cumulative_cases: row.Cumulative_cases || 0,
        new_deaths: row.New_deaths || 0,
        cumulative_deaths: row.Cumulative_deaths || 0,
      }));
  };

  return {
    data,
    loading,
    error,
    getStats,
    getTrendData,
    getRegionData,
    getAgeData,
    getTableData,
  };
}
