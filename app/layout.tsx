import { lato } from './ui/fonts';
import './ui/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        {children}
        <footer className='w-full bg-[#222] text-lg p-5 text-white text-center'>
          Esto es el footer
        </footer>
      </body>
    </html>
  );
}
