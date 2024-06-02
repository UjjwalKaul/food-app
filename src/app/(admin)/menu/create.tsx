import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import Button from '@components/Button';
import { defaultPizzaImage } from '@components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
export default function CreateProductScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  function validateInputs() {
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price.trim()) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price is not a number');
      return false;
    }
    return true;
  }

  function onCreate() {
    if (!validateInputs()) {
      return;
    }
    console.warn('Creating product', name, price);
    //Save in db
    setName('');
    setPrice('');
    setErrors('');
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Product' }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        keyboardType="default"
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <Text style={styles.label}>Price (₹)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="999.99"
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={{ color: 'red' }}>{errors}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'gainsboro',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
    fontSize: 18,
  },
});
