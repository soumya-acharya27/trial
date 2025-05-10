// CustomDropdown.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { styles } from './styles';

interface DropdownProps {
  label: string;
  data: string[];
  value: string;
  onSelect: (item: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ label, data, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectedText}>
          {value?.length ? value : 'Select an option'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
