// ekranın altında iki buton olmalı
// butonlara basıldığında bir sonraki ve bir önceki ekrana gidebilmeli
// ilk ekrandaysa geri gitme butonu, son ekrandaysa ileri gitme butonu
// disable olmalıdır.
// ekran görüntüsündeki ekranı oluşturmaya çalışın

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
} from 'react-native';

import data from '../data.json';

const width = Dimensions.get('screen').width;

export const Onboarding = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.title}>AGE</Text>
        <Text>What is your age?</Text>
        <View>
          <Text>cevaplar</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={[1, 2, 3]}
        horizontal
        pagingEnabled
        // scrollEnabled={false}
        renderItem={(item) => renderItem(item)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  renderItemContainer: {
    flex: 1,
    padding: 16,
    width: width,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
