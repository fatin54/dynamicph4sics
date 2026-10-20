import React from 'react';
import { LESSONS_DATABASE } from '@/data/lessons';
import LessonDetailClient from './LessonDetailClient';

export function generateStaticParams() {
  return LESSONS_DATABASE.map((lesson) => ({
    id: lesson.id,
  }));
}

export default function LessonDetailPage({ params }: { params: { id: string } }) {
  return <LessonDetailClient id={params.id} />;
}
