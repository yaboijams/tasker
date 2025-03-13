// src/app/components/SortableList.tsx
'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import List from './List';
import type { ListType } from '../types';

export default function SortableList({ list }: { list: ListType }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: list.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <List list={list} />
    </div>
  );
}
