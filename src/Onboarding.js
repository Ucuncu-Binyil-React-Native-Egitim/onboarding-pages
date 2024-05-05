import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';

import data from '../data.json';

const width = Dimensions.get('screen').width;

export const Onboarding = () => {
  const flatlistRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const skinCareQuestions = [
    {
      title: 'Cilt Tipi',
      description:
        'Cildiniz yağlı mı, kuru mu, karma mı, hassas mı yoksa normal mi?',
      options: ['Yağlı', 'Kuru', 'Karma', 'Hassas', 'Normal'],
    },
    {
      title: 'Cilt Sorunları',
      description:
        'Akne, lekeler, kızarıklık, kuruluk veya diğer cilt sorunlarıyla ilgili endişeleriniz var mı?',
      options: ['Evet', 'Hayır'],
    },
    {
      title: 'Günlük Alışkanlıklar',
      description:
        'Makyaj kullanıyor musunuz? Kullanıyorsanız, makyaj temizleme alışkanlıklarınız neler?',
      options: ['Evet', 'Hayır'],
    },
    {
      title: 'Mevsimsel Etkiler',
      description:
        'Cildiniz mevsimsel değişikliklere nasıl tepki verir? Kışın ve yazın cilt bakım rutininizde değişiklik yapar mısınız?',
      options: ['Evet', 'Hayır'],
    },
    {
      title: 'Ürün Toleransı',
      description:
        'Daha önce kullanmış olduğunuz cilt bakım ürünleri içinde alerjik reaksiyon veya tahrişe neden olan bir ürün var mı?',
      options: ['Evet', 'Hayır'],
    },
    {
      title: 'Yaş ve Genel Sağlık Durumu',
      description:
        'Cilt bakım rutininizi belirlerken yaşınız ve genel sağlık durumunuzun dikkate alınması önemlidir. Özellikle hamilelik veya bazı sağlık sorunları, kullanabileceğiniz ürünleri etkileyebilir.',
      options: ['Genç', 'Orta Yaşlı', 'Yaşlı'],
    },
    {
      title: 'Cilt Bakım Hedefleri',
      description:
        'Cilt bakımı ile ilgili belirli hedefleriniz nelerdir? Örneğin, yaşlanma karşıtı, nemlendirme, leke azaltma vb.',
      options: ['Yaşlanma Karşıtı', 'Nemlendirme', 'Leke Azaltma', 'Diğer'],
    },
  ];

  const handleNext = () => {
    if (currentPage === skinCareQuestions.length - 1) {
      console.log('anket tamamlandı');
    }
    if (selectedOptions[currentPage]) {
      setCurrentPage((prevIndex) => prevIndex + 1);
      flatlistRef.current?.scrollToOffset({
        offset: width * (currentPage + 1),
        animated: true,
      });
    } else {
      Alert.alert(
        'Lütfen bir seçim yapınız',
        'Bu soruyu geçmek için şıklardan birini seçmelisiniz.'
      );
    }
    console.log(selectedOptions);
  };

  const handleBack = () => {
    setCurrentPage((prevIndex) => prevIndex - 1);
    flatlistRef.current?.scrollToOffset({
      offset: width * (currentPage - 1),
      animated: true,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemInnerContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.options}>
            {item.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex.toString()}
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      selectedOptions[index] === option ? 'red' : 'grey',
                  },
                ]}
                onPress={() => {
                  const newSelectedOptions = [...selectedOptions];
                  newSelectedOptions[index] = option;
                  setSelectedOptions(newSelectedOptions);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        selectedOptions[currentPage] === option
                          ? 'white'
                          : 'black',
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { opacity: currentPage === 0 ? 0.5 : 1 }]}
            onPress={handleBack}
            disabled={currentPage === 0}
          >
            <Text>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text>
              {currentPage === skinCareQuestions.length - 1 ? 'Done' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        style={{ flex: 1 }}
        data={skinCareQuestions}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
    paddingBottom: 60,
    width: width,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  renderItemInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 32,
    maxWidth: '80%',
    textAlign: 'center',
  },
  description: {
    maxWidth: '80%',
    textAlign: 'center',
    marginVertical: 16,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    maxWidth: '75%',
  },
  option: {
    margin: 16,
    backgroundColor: '#00A7FF',
    padding: 8,
    borderRadius: 8,
  },
  optionText: {},
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#00A7FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignSelf: 'center',
  },
});
