import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote, Note, ChecklistNote, IdeaNote } from '../types';


interface NotesState {
  notes: AnyNote[];
  addNote: (note: AnyNote) => void;
  deleteNote: (id: string) => void;
  toggleChecklistItem: (noteId: string, itemId: string) => void;
}


export const useNotesStore = create<NotesState>()(
  
  persist(
    (set) => ({
      
      notes: [],

      
      addNote: (note) => 
        set((state) => ({ 
          notes: [note, ...state.notes] 
        })),

      
      deleteNote: (id) => 
        set((state) => ({ 
          notes: state.notes.filter((n) => n.id !== id) 
        })),

      
      toggleChecklistItem: (noteId, itemId) =>
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id === noteId && note.type === 'checklist') {
              return {
                ...note,
                items: note.items.map((item) =>
                  item.id === itemId
                    ? { ...item, isCompleted: !item.isCompleted }
                    : item
                ),
              };
            }
            return note;
          }),
        })),
    }),
    {
      name: 'noteflow-storage', 
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);