import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, useTheme, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useNotesStore } from '../store/notesStore';
import { Note } from '../types';


const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

export default function NuevaNotaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  
  const [errors, setErrors] = useState({ title: '', content: '' });

  const handleSave = () => {
    
    const validation = noteSchema.safeParse({ title: title.trim(), content: content.trim() });

    if (!validation.success) {
      
      const formattedErrors = validation.error.format();
      setErrors({
        title: formattedErrors.title?._errors[0] || '',
        content: formattedErrors.content?._errors[0] || '',
      });
      return; 
    }

    
    setErrors({ title: '', content: '' });

    const newNote: Note = {
      id: Date.now().toString(),
      type: 'note',
      title: validation.data.title, 
      content: validation.data.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addNote(newNote);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          <TextInput
            label="Título de la nota"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: '' }); 
            }}
            mode="outlined"
            style={styles.input}
            error={!!errors.title} 
          />
          {/* Muestra el texto de error debajo del campo si existe */}
          {errors.title ? <HelperText type="error" visible={true}>{errors.title}</HelperText> : null}
          
          <TextInput
            label="Escribe aquí tu nota..."
            value={content}
            onChangeText={(text) => {
              setContent(text);
              if (errors.content) setErrors({ ...errors, content: '' });
            }}
            mode="outlined"
            multiline
            numberOfLines={8}
            style={[styles.input, styles.textArea]}
            error={!!errors.content}
          />
          {errors.content ? <HelperText type="error" visible={true}>{errors.content}</HelperText> : null}
          
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={styles.button}
            icon="content-save-outline"
          >
            Guardar Nota
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 4,
  },
  textArea: {
    minHeight: 150,
  },
  button: {
    marginTop: 12,
    paddingVertical: 6,
  },
});