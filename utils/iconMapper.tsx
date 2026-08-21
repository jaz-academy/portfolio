import * as HeroIcons from '@heroicons/react/24/outline';
import type React from 'react';

export function getIconComponent(iconName: string | undefined | null) {
  if (!iconName) return HeroIcons.CheckCircleIcon // default fallback
  const Icon = (HeroIcons as Record<string, React.ElementType>)[iconName]
  return Icon || HeroIcons.CheckCircleIcon
}
