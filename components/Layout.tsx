// components/Layout.tsx
import React from 'react';
import Link from 'next/link';

const Layout: React.FC = ({ children }) => (
    <div>
        <header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
    </div>
);

export default Layout;
