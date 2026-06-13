import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, useTheme, Text, Chip, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../store/notesStore';
import { IdeaNote } from '../types';

// Definimos una paleta de 5 colores pasteles estéticos que contrastan bien con texto oscuro
const PALETA_COLORES = [
  '#ffffff', // Blanco / Por defecto
  '#e3f2fd', // Azul pastel
  '#e8f5e9', // Verde pastel
  '#fff3e0', // Naranja/Crema pastel
  '#f3e5f5', // Morado pastel
  '#ffebee', // Rosa pastel
];

export default function NuevaIdeaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  // Estados del formulario
  const [title, setTitle] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  // Añadir un tag al array local
  const handleAddTag = () => {
    const cleanedTag = currentTag.trim().toLowerCase();
    if (cleanedTag && !tags.includes(cleanedTag)) {
      setTags([...tags, cleanedTag]);
      setCurrentTag(''); // Limpiamos el input de tags
    }
  };

  // Quitar un tag si el usuario se arrepiente
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Guardar la idea completa
  const handleSave = () => {
    if (!title.trim()) return;

    const newIdea: IdeaNote = {
      id: Date.now().toString(),
      type: 'idea',
      title: title.trim(),
      tags: tags,
      color: selectedColor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addNote(newIdea);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Input del título de la idea */}
        <TextInput
          label="¿Qué gran idea has tenido?"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        {/* Sección de Selección de Color */}
        <Text variant="titleSmall" style={styles.sectionTitle}>Elige un color de fondo:</Text>
        <View style={styles.colorRow}>
          {PALETA_COLORES.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && { borderColor: theme.colors.primary, borderWidth: 3 }
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        {/* Sección de Tags */}
        <Text variant="titleSmall" style={styles.sectionTitle}>Añadir etiquetas (Categorías):</Text>
        <View style={styles.tagInputRow}>
          <TextInput
            label="Ej: diseño, app, examen..."
            value={currentTag}
            onChangeText={setCurrentTag}
            mode="outlined"
            style={styles.tagInput}
            onSubmitEditing={handleAddTag} // Permite añadir pulsando "Intro" en el teclado
          />
          <IconButton
            icon="plus-box"
            size={28}
            mode="contained"
            containerColor={theme.colors.primaryContainer}
            iconColor={theme.colors.onPrimaryContainer}
            onPress={handleAddTag}
            style={styles.tagButton}
          />
        </View>

        {/* Visualizador de las etiquetas añadidas */}
        <View style={styles.chipsContainer}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              onClose={() => handleRemoveTag(tag)}
              style={styles.chip}
              textStyle={styles.chipText}
            >
              #{tag}
            </Chip>
          ))}
        </View>

        {/* Botón de guardar definitivo */}
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          icon="lightbulb-outline"
          disabled={!title.trim()} // Deshabilitado si no hay título escrito
        >
          Guardar Idea
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
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  tagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tagInput: {
    flex: 1,
  },
  tagButton: {
    margin: 0,
    borderRadius: 4,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32,
  },
  chip: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  chipText: {
    fontSize: 13,
  },
  saveButton: {
    paddingVertical: 6,
  },
});