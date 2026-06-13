import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import NoteCard from '../../components/NoteCard';
import { useNotesStore } from '../../store/notesStore';

export default function NotasScreen() {
  const theme = useTheme();
  // Enganchamos el enrutador para poder navegar
  const router = useRouter(); 
  
  const notes = useNotesStore((state) => state.notes);
  const textNotes = notes.filter(note => note.type === 'note');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={textNotes}
        keyExtractor={(item) => item.id}
        // Damos un poco de margen abajo para que la última nota no quede tapada por el botón
        contentContainerStyle={styles.list} 
        renderItem={({ item }) => <NoteCard note={item} />}
      />
      
      {/* Nuestro Botón Flotante (Floating Action Button) */}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => router.push('/nueva-nota')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingBottom: 80, 
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});