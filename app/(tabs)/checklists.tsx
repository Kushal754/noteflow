import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text, FAB, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import NoteCard from '../../components/NoteCard';
import { useNotesStore } from '../../store/notesStore';

export default function ChecklistsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChecklists = notes.filter(note => 
    note.type === 'checklist' && 
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Searchbar
        placeholder="Buscar listas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlashList
        data={filteredChecklists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <NoteCard note={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              No se encontraron listas de tareas.
            </Text>
          </View>
        }
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => router.push('/nueva-tarea')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchbar: { margin: 16, marginBottom: 8 },
  list: { padding: 16, paddingBottom: 80 },
  empty: { padding: 32, alignItems: 'center', opacity: 0.7 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});