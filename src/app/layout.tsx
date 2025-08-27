import { DM_Sans } from 'next/font/google';
import './globals.scss';
import { getGlobalData, getOptionsData } from '@/services/network_requests';

import Header from '@/layouts/Header/Header';

const dmSans = DM_Sans({
  variable: '--primary',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata = {
  generator: process.env.COMPANY_NAME || 'Default Generator',
  applicationName: process.env.COMPANY_NAME || 'Default Application',
  colorScheme: 'light',
  creator: process.env.COMPANY_NAME || 'Default Creator',
  publisher: process.env.COMPANY_NAME || 'Default Publisher',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [globalDataResponse, optionsDataResponse] = await Promise.all([
    getGlobalData(),
    getOptionsData(),
  ]);

  const data = globalDataResponse.data?.data;
  const optionsData = optionsDataResponse.data?.data;

  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased font-primary`}>
        <Header
          optionalData={optionsData}
          globalData={data}
        />
        {children}
      </body>
    </html>
  );
}
