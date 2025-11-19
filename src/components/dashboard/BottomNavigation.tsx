'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, ShoppingBag, BookOpen, Users } from 'lucide-react';

const BottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/track', label: 'Track', icon: Calendar },
    { href: '/shop', label: 'Shop', icon: ShoppingBag },
    { href: '/learn', label: 'Learn', icon: BookOpen },
    { href: '/you', label: 'You', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg border-t border-muted px-4 py-2 flex justify-around items-center shadow-soft">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center transition-colors ${
            pathname === href ? 'text-accent' : 'text-muted hover:text-accent'
          }`}
        >
          <Icon className="w-6 h-6" />
          <span className="font-body text-xs mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;