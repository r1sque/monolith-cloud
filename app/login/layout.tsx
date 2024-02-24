export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-gradient-to-b from-black-100 via-purple-950 via-60% to-purple-700 h-screen flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
