// pages/login.tsx
import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const router = useRouter();

    useEffect(() => {
        if (authState?.isAuthenticated) {
            router.push('/');
        }
    }, [authState, router]);

    if (!authState) {
        return <div>Loading...</div>;
    }

    if (!authState.isAuthenticated) {
        return (
            <Layout>
                <button onClick={() => oktaAuth.signInWithRedirect()}>Login with Okta</button>
            </Layout>
        );
    }

    return <div>You are already logged in!</div>;
};

export default Login;
