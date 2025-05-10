import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';
import { ButtonCustom } from '../../../../../component/ButtonCustom';
import Close from '../../../../../assets/svg/Close.svg';
import { getDummyProfile } from '../../../../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux-saga/rootReducer';

interface PollOption {
  id: string;
  text: string;
}

interface PollCreationProps {
  onSubmit: (question: string, options: PollOption[]) => void;
  onClose: () => void;
}

const PollCreation: React.FC<PollCreationProps> = ({ onSubmit, onClose }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);
  const user = useSelector((state: RootState) => state.authReducer)

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { id: String(options.length + 1), text: '' }]);
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const handleSubmit = () => {
    if (question.trim() && options.every(opt => opt.text.trim())) {
      onSubmit(question, options);
    }
  };

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.questionInput}
          placeholder="Ask your question"
          placeholderTextColor={theme.colors.gray}
          value={question}
          onChangeText={setQuestion}
        />
      
      {options.map((option) => (
        <View key={option.id} style={styles.optionContainer}>
          <TextInput
            style={styles.optionInput}
            placeholder={`Option ${option.id}`}
            placeholderTextColor={theme.colors.gray}
            value={option.text}
            onChangeText={(text) => updateOption(option.id, text)}
          />
          {options.length > 2 && (
            <TouchableOpacity 
              onPress={() => removeOption(option.id)}
              style={styles.removeButton}
            >
              <Close height={hp(2)} width={hp(2)} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {options.length < 4 && (
        <TouchableOpacity onPress={addOption} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add more options</Text>
        </TouchableOpacity>
      )}

      <ButtonCustom
        width={wp(83)}
        title="Create Poll"
        onPress={handleSubmit}
        disabled={!question.trim() || !options.every(opt => opt.text.trim())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(4),
    backgroundColor:'#243139',
    marginHorizontal: wp(4),
    marginTop: hp(2)
  },
  questionInput: {
    borderColor: theme.colors.gray,
    borderRadius: wp(2),
    padding: wp(3),
    marginBottom: hp(2),
    color: theme.colors.white,
    fontSize: wp(4),
    // textAlignVertical: 'top',
    // minHeight: hp(6),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  optionInput: {
    flex: 1,
    backgroundColor:'#0B1E29',
    borderWidth: 1,
    borderColor: theme.colors.gray,
    padding: wp(3),
    color: theme.colors.white,
    fontSize: wp(4),
  },
  removeButton: {
    marginLeft: wp(2),
    padding: wp(2),
    position:'absolute',
    zIndex: 2,
    right: wp(0.5)
  },
  addButton: {
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: wp(4),
  },
  profilePic: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('3'),
    resizeMode:'cover',
    marginLeft: wp(4),

},
});

export default PollCreation; 