import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';

export default function NotaDetalleScreen() {
  const theme = useTheme();
  const router = useRouter();
  
 
  const { id } = useLocalSearchParams<{ id: string }>();
  
  
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const note = notes.find((n) => n.id === id);

  
  if (!note) {
    return (
      <SafeAreaView style={[styles.container, styles.center, { backgroundColor: theme.colors.background }]}>
        <Text>La nota no existe.</Text>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  
  const confirmDelete = () => {
    Alert.alert(
      "Eliminar nota",
      "¿Estás seguro de que quieres borrar esto? No podrás recuperarlo.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, eliminar", 
          style: "destructive", 
          onPress: () => {
            deleteNote(note.id);
            router.back();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Cabecera con botón de volver y botón de borrar */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={28} onPress={() => router.back()} />
        <IconButton icon="delete-outline" size={28} iconColor={theme.colors.error} onPress={confirmDelete} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {note.title}
        </Text>
        
        {/* Renderizamos el contenido dependiendo del tipo de nota */}
        {note.type === 'note' && (
          <Text variant="bodyLarge" style={styles.bodyText}>
            {note.content}
          </Text>
        )}

        {/* Formateamos la fecha */}
        <Text variant="labelMedium" style={styles.date}>
          Creado el: {new Date(note.createdAt).toLocaleString()}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  content: {
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
  bodyText: {
    lineHeight: 24,
  },
  date: {
    marginTop: 40,
    opacity: 0.5,
  },
});