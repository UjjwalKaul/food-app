import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import { defaultPizzaImage } from '@components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/api/products';
export default function CreateProductScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const { id: idString = '' } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString?.[0]
  );

  const isUpdating = !!idString;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();
  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);
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

  function resetFields() {
    setName('');
    setPrice('');
    setErrors('');
  }
  function onCreate() {
    if (!validateInputs()) {
      return;
    }
    //Save in db
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  }
  function onUpdate() {
    if (!validateInputs()) {
      return;
    }

    //Save in db
    updateProduct(
      {
        id,
        name,
        image,
        price: parseFloat(price),
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  }

  function onSubmit() {
    setLoading(!loading);
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
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
  function onDelete() {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace('/(admin)');
      },
    });
  }
  function confirmDelete() {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Updating Product' : 'Create Product' }}
      />
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
      <Button
        disabled={loading}
        onPress={onSubmit}
        text={isUpdating ? 'Update ' : 'Create '}
      />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
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
