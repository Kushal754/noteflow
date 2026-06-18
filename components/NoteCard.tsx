import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, IconButton, Checkbox } from 'react-native-paper';
import { AnyNote } from '../types';
import { useNotesStore } from '../store/notesStore';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface NoteCardProps {
  note: AnyNote;
}

export default function NoteCard({ note }: NoteCardProps) {
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const router = useRouter();
  const toggleChecklistItem = useNotesStore((state) => state.toggleChecklistItem);

  const handleToggle = (itemId: string) => {
    if (note.type !== 'checklist') return;

    toggleChecklistItem(note.id, itemId);

    const toggledItem = note.items.find(i => i.id === itemId);
    
    if (toggledItem && !toggledItem.isCompleted) {
      const allOthersCompleted = note.items
        .filter(i => i.id !== itemId)
        .every(i => i.isCompleted);

      if (allOthersCompleted) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return;
      }
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const dateString = new Date(note.createdAt).toLocaleDateString();

  return (
    <Card 
      style={[
        styles.card, 
        note.type === 'idea' && note.color ? { backgroundColor: note.color } : null
      ]}
      onPress={() => router.push(`/nota/${note.id}`)}
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {note.title || 'Sin título'}
          </Text>
          <IconButton
            icon="delete-outline"
            size={20}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              deleteNote(note.id);
            }}
          />
        </View>

        {note.type === 'note' && (
          <Text variant="bodyMedium" numberOfLines={3}>
            {note.content}
          </Text>
        )}

        {note.type === 'checklist' && (
          <View style={styles.checklistContainer}>
            {note.items.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.checklistItem}>
                <Checkbox
                  status={item.isCompleted ? 'checked' : 'unchecked'}
                  onPress={() => handleToggle(item.id)}
                />
                <Text style={[styles.checklistText, item.isCompleted && styles.completedText]}>
                  {item.text}
                </Text>
              </View>
            ))}
            {note.items.length > 3 && (
              <Text variant="labelSmall" style={styles.moreItems}>
                + {note.items.length - 3} tareas más...
              </Text>
            )}
          </View>
        )}

        {note.type === 'idea' && (
          <View style={styles.tagsContainer}>
            {note.tags.map((tag, index) => (
              <View key={index} style={styles.tagChip}>
                <Text variant="labelSmall" style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <Text variant="labelSmall" style={styles.date}>
          {dateString}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontWeight: 'bold', flex: 1 },
  date: { marginTop: 12, opacity: 0.6, textAlign: 'right' },
  checklistContainer: { marginTop: 4 },
  checklistItem: { flexDirection: 'row', alignItems: 'center', marginLeft: -8 },
  checklistText: { flex: 1 },
  completedText: { textDecorationLine: 'line-through', opacity: 0.5 },
  moreItems: { marginLeft: 32, marginTop: 4, opacity: 0.6 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  tagChip: { backgroundColor: 'rgba(0, 0, 0, 0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { fontWeight: '600' },
});