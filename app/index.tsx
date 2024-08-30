import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Index = () => {
  const router = useRouter();

  // manage accordion state here/cleanup later
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome to WineLister</Text>

      {/* Separate auth for now, TODO: Cleanup into middleware + proper auth */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth?type=login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth?type=signup')}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Top 3 Features - unsure but keep for now */}
      <View style={styles.accordionContainer}>
        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleAccordion(1)}>
          <Text style={styles.accordionTitle}> Wine Tracking</Text>
          <AntDesign name={openAccordion === 1 ? "up" : "down"} size={16} color="black" />
        </TouchableOpacity>
        {openAccordion === 1 && (
          <View style={styles.accordionContent}>
            <Text>Keep track of your favorite wines with detailed notes and ratings.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleAccordion(2)}>
          <Text style={styles.accordionTitle}>Recommendations Just For You</Text>
          <AntDesign name={openAccordion === 2 ? "up" : "down"} size={16} color="black" />
        </TouchableOpacity>
        {openAccordion === 2 && (
          <View style={styles.accordionContent}>
            <Text>Get personalized wine recommendations based on your preferences.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleAccordion(3)}>
          <Text style={styles.accordionTitle}>Learn About Wine</Text>
          <AntDesign name={openAccordion === 3 ? "up" : "down"} size={16} color="black" />
        </TouchableOpacity>
        {openAccordion === 3 && (
          <View style={styles.accordionContent}>
            <Text>Learn about similar wines to your preferences; overall prefered regions and more.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#888',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  accordionContainer: {
    width: '90%',
    marginTop: 20,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 8,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default Index;
