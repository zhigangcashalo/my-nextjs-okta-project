// pages/profile.tsx
import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Header, Icon, Table } from 'semantic-ui-react';
import styles from './Profile.module.css'; // Import the CSS module

const Profile: React.FC = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            router.push('/login');
            setUserInfo(null);
        } else {
            oktaAuth.getUser().then((info) => {
                setUserInfo(info);
                // console.log(JSON.stringify(info));
            });
        }
    }, [authState, oktaAuth, router]);

    if (!authState?.isAuthenticated) {
        return <div>Redirecting to login...</div>;
    }

    const logout = async () => {
        await oktaAuth.signOut();
    };

    return (
        <Layout>
            <div>
                <button onClick={logout}>Logout</button>
                <h1>User Profile</h1>
                <div className={styles.tableMargin}>
                    {userInfo ? (
                        <Table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Claim</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(userInfo).map(([claimName, claimValue]) => (
                                    <tr key={claimName}>
                                        <td>{claimName}</td>
                                        <td id={`claim-${claimName}`}>{claimValue.toString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>Loading user information...</div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
