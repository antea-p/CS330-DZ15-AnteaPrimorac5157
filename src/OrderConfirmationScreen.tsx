import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

interface FoodItem {
    id: string;
    name: string;
    price: number;
}

interface OrderConfirmationScreenProps {
    selectedItems: FoodItem[];
    onConfirmOrder: () => void;
    onGoBack: () => void;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
    selectedItems,
    onConfirmOrder,
    onGoBack
}) => {
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

    const renderItem = ({ item }: { item: FoodItem }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>€{item.price.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Order</Text>
            <FlatList
                data={selectedItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text style={styles.total}>Total: €{totalPrice.toFixed(2)}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Go Back" onPress={onGoBack} />
                <Button title="Confirm Order" onPress={onConfirmOrder} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'right',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default OrderConfirmationScreen;