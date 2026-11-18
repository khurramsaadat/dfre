import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pole 8-12',
};

export default function DesignStudioV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
