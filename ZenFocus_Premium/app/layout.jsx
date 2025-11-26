import '../styles/globals.css';
export const metadata = { title: 'ZenFocus', description: 'A calm new focus timer' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
