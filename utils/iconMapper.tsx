import * as HeroIcons from '@heroicons/react/24/outline'

export function getIconComponent(iconName: string | undefined | null) {
  if (!iconName) return HeroIcons.CheckCircleIcon // default fallback
  const Icon = (HeroIcons as any)[iconName]
  return Icon || HeroIcons.CheckCircleIcon
}
