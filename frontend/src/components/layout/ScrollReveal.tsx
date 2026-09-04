'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const check = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('in');
        }
      });
    };

    document.querySelectorAll('.reveal.in').forEach((el) => el.classList.remove('in'));

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    const t1 = setTimeout(check, 100);
    const t2 = setTimeout(check, 500);
    const t3 = setTimeout(check, 1000);

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}