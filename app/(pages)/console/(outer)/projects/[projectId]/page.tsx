'use client';

import React from 'react';
import ProjectDetail from '../ProjectDetail';

export default function Project({ params }) {
  return (
    <div>
      <ProjectDetail projectId={params?.projectId} />
    </div>
  );
}
