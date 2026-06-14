import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import NoteCard from '../../components/NoteCard';
import { useNotesStore } from '../../store/notesStore';

export default function IdeasScreen() {
  const theme = useTheme();
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);
  const ideaNotes = notes.filter(note => note.type === 'idea');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlashList
        data={ideaNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <NoteCard note={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              No hay ideas guardadas. ¡Crea una nueva!
            </Text>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => router.push('/nueva-idea')}
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
  empty: {
    padding: 32,
    alignItems: 'center',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});