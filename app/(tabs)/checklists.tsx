import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import NoteCard from '../../components/NoteCard';
import { useNotesStore } from '../../store/notesStore';

export default function ChecklistsScreen() {
  const theme = useTheme();
  const notes = useNotesStore((state) => state.notes);
  
  
  const checklistNotes = notes.filter(note => note.type === 'checklist');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={checklistNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <NoteCard note={item} />}
        ListEmptyComponent={
          // Un pequeño texto si no hay tareas aún
          <View style={styles.empty}>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              No tienes listas de tareas activas.
            </Text>
          </View>
        }
      />
    </View>
  );
}

import { Text } from 'react-native-paper'; // Añadimos esto para el texto de vacío

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
    opacity: 0.7,
  }
});