import { lato, lusitana } from './ui/fonts';
import './ui/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.style} antialiased`}>
        {children}
        <footer className='w-full bg-[#181717] text-lg p-5 text-white text-center'>
          Esto es el footer
        </footer>
      </body>
    </html>
  );
}
