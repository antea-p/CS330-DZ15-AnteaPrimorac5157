import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

interface FoodItem {
  id: string;
  name: string;
  price: number;
}

const foodItems: FoodItem[] = [
  { id: '1', name: 'Pizza', price: 10 },
  { id: '2', name: 'Burger', price: 8 },
  { id: '3', name: 'Sushi', price: 12 },
  { id: '4', name: 'Salad', price: 7 },
  { id: '5', name: 'Pasta', price: 9 },
];

interface FoodSelectionScreenProps {
  serviceName: string;
  onSelectItems: (items: FoodItem[]) => void;
  onGoBack: () => void;
}

const FoodSelectionScreen: React.FC<FoodSelectionScreenProps> = ({
  serviceName,
  onSelectItems,
  onGoBack
}) => {
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);

  const toggleItem = (item: FoodItem) => {
    setSelectedItems(prevItems => {
      if (prevItems.find(i => i.id === item.id)) {
        return prevItems.filter(i => i.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const renderItem = ({ item }: { item: FoodItem }) => {
    const isSelected = selectedItems.find(i => i.id === item.id);
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => toggleItem(item)}
      >
        <Text style={styles.itemText}>{item.name} - €{item.price}</Text>
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    if (selectedItems.length > 0) {
      onSelectItems(selectedItems);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Food from {serviceName}</Text>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.selectedItemsContainer}>
        <Text style={styles.selectedItemsText}>
          Selected Items: {selectedItems.length}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={onGoBack} />
        <Button title="Confirm Selection" onPress={handleConfirm} disabled={selectedItems.length === 0} />

      </View>
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
  selectedItem: {
    backgroundColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 18,
  },
  selectedItemsContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
});

export default FoodSelectionScreen;