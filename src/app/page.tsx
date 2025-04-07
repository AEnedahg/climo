import ClimoClient from "./components/ClimoClient";
import type { Metadata } from 'next';
export const metadata: Metadata =  {
  title: 'Climo - Your Personal Weather App',
  description: 'Get accurate and up-to-date weather forecasts anywhere in the world with Climo.',
  icons: {
    icon: '/favicon.svg',
  },
  keywords: ['weather', 'forecast', 'Climo', 'weather app', 'current weather', 'daily forecast'],
  authors: [{ name: 'Anthony Enedah' }],
  creator: 'Anthony Enedah',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Climo - Your Personal Weather App',
    description: 'Get accurate and up-to-date weather forecasts anywhere in the world with Climo.',
    url: 'https://climo.vercel.app',
    siteName: 'Climo',
    images: [
      {
        url: '/climo-preview.png',
        width: 1200,
        height: 630,
        alt: 'Climo weather app preview image',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climo - Your Personal Weather App',
    description: 'Get accurate and up-to-date weather forecasts anywhere in the world with Climo.',
  },
}
export default function Home() {
  return <ClimoClient />
}
