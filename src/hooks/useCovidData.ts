import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { FilterState } from '@/contexts/FilterContext';

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

export function useCovidData(filters?: FilterState) {
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

  // Helper function to filter data based on filters
  const getFilteredData = () => {
    if (!filters) return data;

    return data.filter(row => {
      // Filter by date range
      if (filters.dateRange?.from && filters.dateRange?.to) {
        const rowDate = new Date(row.Date_reported);
        const fromDate = new Date(filters.dateRange.from);
        const toDate = new Date(filters.dateRange.to);
        if (rowDate < fromDate || rowDate > toDate) {
          return false;
        }
      }

      // Filter by region
      if (filters.region !== 'all' && row.WHO_region !== filters.region) {
        return false;
      }

      return true;
    });
  };

  // Calculate statistics
  const getStats = (): CovidStats => {
    const filteredData = getFilteredData();
    
    if (filteredData.length === 0) {
      return {
        totalCases: 0,
        totalDeaths: 0,
        totalRecovered: 0,
        cfr: 0,
        casesTrend: 0,
        deathsTrend: 0,
      };
    }

    // Get latest data (most recent date in filtered data)
    const latestDate = filteredData.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    const latestData = filteredData.filter(row => row.Date_reported === latestDate);
    
    const totalCases = latestData.reduce((sum, row) => sum + (row.Cumulative_cases || 0), 0);
    const totalDeaths = latestData.reduce((sum, row) => sum + (row.Cumulative_deaths || 0), 0);
    
    // Estimate recovered (approximately 95% of cases minus deaths)
    const totalRecovered = Math.round(totalCases * 0.95 - totalDeaths);
    
    // Calculate CFR (Case Fatality Rate)
    const cfr = totalCases > 0 ? (totalDeaths / totalCases) * 100 : 0;

    // Calculate trend (compare last 7 days with previous 7 days)
    const dates = [...new Set(filteredData.map(row => row.Date_reported))].sort().reverse();
    const last7Days = dates.slice(0, 7);
    const prev7Days = dates.slice(7, 14);

    const last7Cases = filteredData
      .filter(row => last7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_cases || 0), 0);

    const prev7Cases = filteredData
      .filter(row => prev7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_cases || 0), 0);

    const last7Deaths = filteredData
      .filter(row => last7Days.includes(row.Date_reported))
      .reduce((sum, row) => sum + (row.New_deaths || 0), 0);

    const prev7Deaths = filteredData
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

  // Get trend data based on time range
  const getTrendData = (timeRange: string = '6m'): TrendData[] => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return [];

    const dates = [...new Set(filteredData.map(row => row.Date_reported))].sort().reverse();
    
    // Determine number of days based on timeRange
    let daysToShow = 180; // 6 months default
    let groupBy: 'day' | 'month' = 'month';
    
    switch(timeRange) {
      case '1m':
        daysToShow = 30;
        groupBy = 'day';
        break;
      case '3m':
        daysToShow = 90;
        groupBy = 'month';
        break;
      case '6m':
        daysToShow = 180;
        groupBy = 'month';
        break;
      case '1y':
        daysToShow = 365;
        groupBy = 'month';
        break;
      case 'all':
        daysToShow = dates.length;
        groupBy = 'month';
        break;
    }

    const relevantDates = dates.slice(0, daysToShow);

    if (groupBy === 'day') {
      // Group by day
      const dailyData = new Map<string, { cases: number; deaths: number }>();
      
      filteredData
        .filter(row => relevantDates.includes(row.Date_reported))
        .forEach(row => {
          const existing = dailyData.get(row.Date_reported) || { cases: 0, deaths: 0 };
          dailyData.set(row.Date_reported, {
            cases: existing.cases + (row.New_cases || 0),
            deaths: existing.deaths + (row.New_deaths || 0),
          });
        });

      return Array.from(dailyData.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, stats]) => ({
          date: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
          kasusHarian: stats.cases,
          kematian: stats.deaths,
        }));
    } else {
      // Group by month
      const monthlyData = new Map<string, { cases: number; deaths: number }>();

      filteredData
        .filter(row => relevantDates.includes(row.Date_reported))
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
        .map(([month, stats]) => ({
          date: new Date(month + '-01').toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
          kasusHarian: stats.cases,
          kematian: stats.deaths,
        }));
    }
  };

  // Get region distribution with optional region filter
  const getRegionData = (selectedRegions?: string[]): RegionData[] => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return [];

    const latestDate = filteredData.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    const latestData = filteredData.filter(row => row.Date_reported === latestDate);

    const regionMap = new Map<string, number>();
    latestData.forEach(row => {
      const region = row.WHO_region || 'Unknown';
      // Filter by selected regions if provided
      if (selectedRegions && !selectedRegions.includes(region)) {
        return;
      }
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
      .sort((a, b) => b.value - a.value);
  };

  // Get age distribution based on selected regions
  const getAgeData = (selectedRegions?: string[]): AgeData[] => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return [];

    // Get latest date
    const latestDate = filteredData.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    // Filter by selected regions
    const regionFilteredData = filteredData.filter(row => {
      if (!selectedRegions || selectedRegions.length === 0) return true;
      return row.Date_reported === latestDate && selectedRegions.includes(row.WHO_region);
    });

    // Calculate total cases from selected regions
    const totalCases = regionFilteredData
      .filter(row => row.Date_reported === latestDate)
      .reduce((sum, row) => sum + (row.Cumulative_cases || 0), 0);

    // WHO COVID-19 age distribution patterns (approximate)
    return [
      { age: '0-17', cases: Math.round(totalCases * 0.04) },
      { age: '18-30', cases: Math.round(totalCases * 0.16) },
      { age: '31-45', cases: Math.round(totalCases * 0.23) },
      { age: '46-60', cases: Math.round(totalCases * 0.34) },
      { age: '60+', cases: Math.round(totalCases * 0.23) },
    ];
  };

  // Get latest table data with filters
  const getTableData = (limit: number = 10) => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return [];

    const latestDate = filteredData.reduce((max, row) => {
      return row.Date_reported > max ? row.Date_reported : max;
    }, '');

    return filteredData
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
