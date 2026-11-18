import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pole 1-7',
};

export default function DesignStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
