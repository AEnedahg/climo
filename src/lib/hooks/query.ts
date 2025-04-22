import { useQuery } from '@tanstack/react-query';
import { currentAPI, forecastAPI, searchAPI } from '../api/api';

export const searchQueryFunc = (location: string, region: string, country: string) => {
  return useQuery({
    queryKey: ["search", location, region, country],
    queryFn: () => (searchAPI(location, region, country)),
  });
}

export const forecastQueryFunc = (location: string, region: string, country: string, day: string) => {
  return useQuery({
    queryKey: ['forcast', location, region, country, day],
    queryFn: () => forecastAPI(location, region, country, day),
  })
}

export const currentQueryFunc = (location: string, region: string, country: string) => {
  return useQuery({
    queryKey: ['current', location, region, country],
    queryFn: () => currentAPI(location, region, country)
  })
}