import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign out"
          onPress={async () => {
            await supabase.auth.signOut();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 150,
    marginTop: 20,
  },
});
