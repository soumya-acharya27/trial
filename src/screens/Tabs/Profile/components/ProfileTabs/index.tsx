import {View, Pressable, Text} from "react-native"
import { styles } from "./styles";

interface TabsProps {
    tabs: string[];
    activeTab: number;
    onTabPress: (num: number) => void
}

const Tabs = ({ tabs, activeTab, onTabPress }: TabsProps) => {
    return (
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index: number) => (
          <Pressable
            key={index}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
            onPress={() => onTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
    );
};

export default Tabs