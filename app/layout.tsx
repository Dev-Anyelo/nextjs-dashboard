import { lato, lusitana } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.style} antialiased`}>{children}</body>
    </html>
  );
}
