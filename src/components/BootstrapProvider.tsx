'use client';

import { useEffect } from 'react';

interface BootstrapProviderProps {
  children: React.ReactNode;
}

export default function BootstrapProvider({ children }: BootstrapProviderProps) {
  useEffect(() => {
    // Import Bootstrap JavaScript only on client side
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return <>{children}</>;
} 