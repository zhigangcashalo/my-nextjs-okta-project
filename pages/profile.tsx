// pages/profile.tsx
import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Header, Icon, Table } from 'semantic-ui-react';

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
                <h1>User Profile</h1>
                <button onClick={logout}>Logout</button>
                <div>
                    <Header as="h1">
                        <Icon name="drivers license" /> My User Profile (ID Token Claims)
                    </Header>
                    <p>
                        Below is the information from your ID token which was obtained during the&nbsp;
                        <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
                        &nbsp;and is now stored in local storage.
                    </p>
                    <p>
                        This route is protected with the&nbsp;
                        <code>&lt;SecureRoute&gt;</code>
                        &nbsp;component, which will ensure that this page cannot be accessed until you have authenticated.
                    </p>
                    {userInfo ? (
                        <Table>
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
