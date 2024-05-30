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
            <header style={{ backgroundColor: '#333', height: '60px' }}> {/* Set header height */}
                <nav style={{ height: '100%' }}> {/* Ensure nav takes full height */}
                    <ul style={{ display: 'flex', listStyle: 'none', padding: 0, height: '100%' }}>
                        <li className={styles.navItem}>
                            <Link href="/" legacyBehavior>
                                <a className={`${styles.navLink} ${isActive('/') ? styles.activeNavLink : ''}`}>Home</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/profile" legacyBehavior>
                                <a className={`${styles.navLink} ${isActive('/profile') ? styles.activeNavLink : ''}`}>Profile</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/login" legacyBehavior>
                                <a className={`${styles.navLink} ${isActive('/login') ? styles.activeNavLink : ''}`}>Login</a>
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
