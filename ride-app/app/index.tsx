import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default function Index() {
    const { user, isLoading } = useAuth();
    const [role, setRole] = useState<string | null>(null);
    const [loadingRole, setLoadingRole] = useState(true);

    const [fontsLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        const fetchRole = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(role)
                    setRole(docSnap.data().role);
                }
            } else {
                setRole(null);
            }
            setLoadingRole(false);
        };

        fetchRole();
    }, [user]);

    if (!fontsLoaded || isLoading || loadingRole || (user && !role)) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (!user) return <Redirect href="/(unauth)" />;
    if (role === 'passenger') return <Redirect href="/(rider)" />;
    if (role === 'driver') return <Redirect href="/(driver)" />;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Redirecting...</Text>
        </View>
    );
}
