import { z } from 'zod';

const HourlyWeatherSchema = z.object({
  time_epoch: z.number(),
  time: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number(),
  condition: z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number()
  }),
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  feelslike_c: z.number(),
  feelslike_f: z.number(),
  will_it_rain: z.number(),
  chance_of_rain: z.number(),
  will_it_snow: z.number(),
  chance_of_snow: z.number(),
});

const DailyWeatherSchema = z.object({
  date: z.string(),
  date_epoch: z.number(),
  day: z.object({
    maxtemp_c: z.number(),
    maxtemp_f: z.number(),
    mintemp_c: z.number(),
    mintemp_f: z.number(),
    daily_chance_of_snow: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
  }),
  astro: z.object({
    sunrise: z.string(),
    sunset: z.string(),
    moonrise: z.string(),
    moonset: z.string(),
  }),
  hour: z.array(HourlyWeatherSchema),
});
    

export const forecastSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime_epoch: z.number(),
    localtime: z.string()
  }),
  current: z.object({
    last_updated_epoch: z.number(),
    last_updated: z.string(),
    is_day: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number()
    }),
    wind_mph: z.number(),
    wind_kph: z.number(),
    wind_degree: z.number(),
    wind_dir: z.string().max(2),
    humidity: z.number(),
    cloud: z.number(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
  }),
  forecast: z.object({
    forecastday: z.array(DailyWeatherSchema)    
  })
})
