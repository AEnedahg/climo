import { useQuery } from '@tanstack/react-query';
import { currentAPI, forecastAPI, searchAPI } from '../api/api';

export const searchQueryFunc = <T,>(location: string) => {
  return useQuery({
    queryKey: ["search", location],
    queryFn: () => (searchAPI(location)),
  });
}

export const forecastQueryFunc = <T,>(
  location: string,
  region: string,
) => {
  return useQuery({
    queryKey: ["forecast", location, region],
    queryFn: () => forecastAPI(location, region),
  });
};

export const currentQueryFunc = <T,>(location: string, region: string) => {
  return useQuery({
    queryKey: ['current', location, region],
    queryFn: () => currentAPI(location, region)
  })
}