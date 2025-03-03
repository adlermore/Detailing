import "@/styles/globals.scss";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import QuotePopup from "@/components/quote/QuotePopup.jsx";
import SuccessPopup from "@/components/layout/SuccessPopup.jsx";
import { JsonContextProvider } from "@/context/jsonContext";

export const metadata = {
  title: "Car Wash & Detailing Services",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  // Settings Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/settings' , {cache: 'no-cache'} )
  const { data } = await res.json()

  return (
    <JsonContextProvider>
      <html lang="en">
        <body className='flex flex-col'>
          <Header settingsData={data} />
          <SuccessPopup />
          <div className="flex-1 main-wrapper">{children}</div>
          <QuotePopup />
          <Footer settingsData={data} />
        </body>
      </html>
    </JsonContextProvider>
  );
}
