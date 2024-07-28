import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface DeliveryService {
    id: string;
    name: string;
}

const deliveryServices: DeliveryService[] = [
    { id: '1', name: 'Bolt' },
    { id: '2', name: 'Wolt' },
    { id: '3', name: 'Glovo' },
];

interface MainScreenProps {
    onSelectService: (serviceName: string) => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onSelectService }) => {
    const renderItem = ({ item }: { item: DeliveryService }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => onSelectService(item.name)}
        >
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Delivery Service</Text>
            <FlatList
                data={deliveryServices}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    item: {
        padding: 10,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default MainScreen;