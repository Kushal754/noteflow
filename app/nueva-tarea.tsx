import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, useTheme, IconButton, Text, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../store/notesStore';
import { ChecklistNote, ChecklistItem } from '../types';

export default function NuevaTareaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  // Estados
  const [title, setTitle] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState<ChecklistItem[]>([]);

 
  const handleAddTask = () => {
    if (currentTask.trim()) {
      const newTask: ChecklistItem = {
        id: Date.now().toString() + Math.random().toString(), 
        text: currentTask.trim(),
        isCompleted: false, 
      };
      setTasks([...tasks, newTask]);
      setCurrentTask(''); 
    }
  };


  const handleRemoveTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };


  const handleSave = () => {

    if (!title.trim() || tasks.length === 0) return;

    const newChecklist: ChecklistNote = {
      id: Date.now().toString(),
      type: 'checklist',
      title: title.trim(),
      items: tasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addNote(newChecklist);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <TextInput
          label="Título de la lista (Ej: Compra, Proyecto...)"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        {/* Input para ir añadiendo tareas */}
        <Text variant="titleSmall" style={styles.sectionTitle}>Añadir Tareas:</Text>
        <View style={styles.taskInputRow}>
          <TextInput
            label="Escribe una tarea..."
            value={currentTask}
            onChangeText={setCurrentTask}
            mode="outlined"
            style={styles.taskInput}
            onSubmitEditing={handleAddTask}
          />
          <IconButton
            icon="plus-box"
            size={28}
            mode="contained"
            containerColor={theme.colors.primaryContainer}
            iconColor={theme.colors.onPrimaryContainer}
            onPress={handleAddTask}
            style={styles.taskButton}
          />
        </View>

        {/* Visualizador de tareas añadidas */}
        <View style={styles.tasksList}>
          {tasks.map((task, index) => (
            <List.Item
              key={task.id}
              title={`${index + 1}. ${task.text}`}
              titleStyle={styles.taskItemText}
              right={() => (
                <IconButton
                  icon="close"
                  size={20}
                  iconColor={theme.colors.error}
                  onPress={() => handleRemoveTask(task.id)}
                />
              )}
              style={styles.taskItem}
            />
          ))}
          {tasks.length === 0 && (
            <Text style={[styles.emptyText, { color: theme.colors.outline }]}>
              Aún no has añadido ninguna tarea.
            </Text>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          icon="checkbox-marked-outline"
          disabled={!title.trim() || tasks.length === 0}
        >
          Guardar Lista
        </Button>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  taskInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  taskInput: {
    flex: 1,
  },
  taskButton: {
    margin: 0,
    borderRadius: 4,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksList: {
    marginBottom: 24,
    minHeight: 100,
  },
  taskItem: {
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.02)',
    marginBottom: 4,
    borderRadius: 4,
  },
  taskItemText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  saveButton: {
    paddingVertical: 6,
  },
});