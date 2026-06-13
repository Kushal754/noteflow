
export interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Note extends BaseNote { 
  type: 'note';
  content: string; 
}


export interface ChecklistNote extends BaseNote { 
  type: 'checklist';
  items: ChecklistItem[]; 
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}


export interface IdeaNote extends BaseNote { 
  type: 'idea';
  tags: string[]; 
  color: string; 
}


export type AnyNote = Note | ChecklistNote | IdeaNote;