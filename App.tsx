import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import MainScreen from './src/MainScreen';
import FoodSelectionScreen from './src/FoodSelectionScreen';
import OrderConfirmationScreen from './src/OrderConfirmationScreen';
import OrderConfirmedScreen from './src/OrderConfirmedScreen';

interface FoodItem {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'Main' | 'FoodSelection' | 'OrderConfirmation' | 'OrderConfirmed'>('Main');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const navigateToFoodSelection = (serviceName: string) => {
    setSelectedService(serviceName);
    setCurrentScreen('FoodSelection');
  };

  const navigateToOrderConfirmation = (items: FoodItem[]) => {
    setSelectedItems(items);
    setCurrentScreen('OrderConfirmation');
  };

  const confirmOrder = () => {
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
    setCurrentScreen('OrderConfirmed');
  };

  const startNewOrder = () => {
    setSelectedService('');
    setSelectedItems([]);
    setTotalPrice(0);
    setCurrentScreen('Main');
  };

  const goBack = () => {
    switch (currentScreen) {
      case 'FoodSelection':
        setCurrentScreen('Main');
        break;
      case 'OrderConfirmation':
        setCurrentScreen('FoodSelection');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentScreen === 'Main' && (
        <MainScreen onSelectService={navigateToFoodSelection} />
      )}
      {currentScreen === 'FoodSelection' && (
        <FoodSelectionScreen 
          serviceName={selectedService} 
          onSelectItems={navigateToOrderConfirmation}
          onGoBack={goBack}
        />
      )}
      {currentScreen === 'OrderConfirmation' && (
        <OrderConfirmationScreen 
          selectedItems={selectedItems}
          onConfirmOrder={confirmOrder}
          onGoBack={goBack}
        />
      )}
      {currentScreen === 'OrderConfirmed' && (
        <OrderConfirmedScreen 
          totalPrice={totalPrice}
          onStartNewOrder={startNewOrder}
        />
      )}
    </SafeAreaView>
  );
};

export default App;