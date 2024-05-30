// pages/profile.tsx
import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Header, Icon, Table } from 'semantic-ui-react';
import styles from './Profile.module.css'; // Import the CSS module
import axios from 'axios';

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
                // setUserInfo(info);
                console.log(JSON.stringify(info));
                const fetchUserInfo = async () => {
                    try {
                        const response = await axios.get(`/api/userinfo?userId=${info.sub}`);
                        setUserInfo(response.data);
                        console.log(JSON.stringify(response.data));
                    } catch (error) {
                        console.error('Error fetching user info:', error);
                    }
                };
                fetchUserInfo()

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
                {/* <div className={styles.tableMargin}>
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
                </div> */}
                <div className={styles.scrollableContainer}>
                    <div className={styles.tableMargin}>
                        {userInfo ? (
                            <Table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Iterate over each property of userInfo */}
                                    {Object.entries(userInfo).map(([fieldName, fieldValue]) => (
                                        <React.Fragment key={fieldName}>
                                            {/* Check if fieldValue is an object (nested) */}
                                            {typeof fieldValue === 'object' ? (
                                                // If fieldValue is an object, recursively iterate over its properties
                                                Object.entries(fieldValue).map(([nestedFieldName, nestedFieldValue]) => (
                                                    <tr key={`${fieldName}-${nestedFieldName}`}>
                                                        <td>{`${fieldName}.${nestedFieldName}`}</td>
                                                        <td id={`claim-${fieldName}-${nestedFieldName}`}>
                                                            {nestedFieldValue ? nestedFieldValue.toString() : ''}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                // If fieldValue is not an object, display it directly
                                                <tr key={fieldName}>
                                                    <td>{fieldName}</td>
                                                    <td id={`claim-${fieldName}`}>{fieldValue ? fieldValue.toString() : ''}</td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div>Loading user information...</div>
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Profile;
