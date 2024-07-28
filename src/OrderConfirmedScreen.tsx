import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface OrderConfirmedScreenProps {
    totalPrice: number;
    onStartNewOrder: () => void;
}

const OrderConfirmedScreen: React.FC<OrderConfirmedScreenProps> = ({
    totalPrice,
    onStartNewOrder
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Confirmed!</Text>
            <Text style={styles.message}>
                Your order with a total of €{totalPrice.toFixed(2)} has been confirmed.
            </Text>
            <Text style={styles.deliveryMessage}>
                Your delivery is on the way. Thank you for your order!
            </Text>
            <Button title="Start New Order" onPress={onStartNewOrder} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    deliveryMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default OrderConfirmedScreen;