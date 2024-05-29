// components/Layout.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';

const Layout: React.FC = ({ children }) => {
    const router = useRouter();

    const isActive = (path: string) => router.pathname === path;

    return (
        <div>
            <header>
                <nav>
                    <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                        <li className={styles.navItem}>
                            <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.activeNavLink : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/profile" className={`${styles.navLink} ${isActive('/profile') ? styles.activeNavLink : ''}`}>
                                Profile
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/login" className={`${styles.navLink} ${isActive('/login') ? styles.activeNavLink : ''}`}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
