import { Bike, Droplets, Recycle, Zap, type LucideIcon } from 'lucide-react'

import type { Category } from '../types/api'

export interface CategoryInfo {
  id: Category
  name: string
  description: string
  icon: LucideIcon
  ods: number[]
  /** Classes estáticas para o Tailwind detectar no build. */
  classes: {
    iconBox: string
    bar: string
    text: string
  }
}

export const categories: Record<Category, CategoryInfo> = {
  water: {
    id: 'water',
    name: 'Água',
    description: 'Banho, torneiras, vazamentos e reaproveitamento de água.',
    icon: Droplets,
    ods: [6, 14],
    classes: { iconBox: 'bg-water-50 text-water-600', bar: 'bg-water-500', text: 'text-water-700' },
  },
  energy: {
    id: 'energy',
    name: 'Energia',
    description: 'Iluminação, aparelhos em espera, climatização e eficiência.',
    icon: Zap,
    ods: [7, 13],
    classes: { iconBox: 'bg-energy-50 text-energy-600', bar: 'bg-energy-500', text: 'text-energy-700' },
  },
  waste: {
    id: 'waste',
    name: 'Resíduos',
    description: 'Reciclagem, descartáveis, eletrônicos e desperdício de alimentos.',
    icon: Recycle,
    ods: [12, 14, 15],
    classes: { iconBox: 'bg-waste-50 text-waste-600', bar: 'bg-waste-500', text: 'text-waste-700' },
  },
  consumption_and_mobility: {
    id: 'consumption_and_mobility',
    name: 'Consumo e Mobilidade',
    description: 'Transporte, compras conscientes e cuidado com espaços naturais.',
    icon: Bike,
    ods: [3, 12, 13, 15],
    classes: {
      iconBox: 'bg-consumption-50 text-consumption-600',
      bar: 'bg-consumption-500',
      text: 'text-consumption-700',
    },
  },
}

export const categoryList: CategoryInfo[] = Object.values(categories)
