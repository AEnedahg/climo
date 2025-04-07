import { useQuery } from '@tanstack/react-query';
import { currentAPI, forcastAPI, searchAPI } from '../api/api';

export const searchQueryFunc = (location: string) => {
  return useQuery({
    queryKey: ["search", location],
    queryFn: () => (location ? searchAPI(location) : null),
    enabled: !!location,
    staleTime: 5 * 60 * 1000,
  });
}

export const forcastQueryFunc = (location: string, days: number) => {
  return useQuery({
    queryKey: ['forcast', location, days],
    queryFn: () => forcastAPI(location, days),
  })
}

export const currentQueryFunc = (location: string) => {
  return useQuery({
    queryKey: ['current', location],
    queryFn: () => currentAPI(location)
  })
}