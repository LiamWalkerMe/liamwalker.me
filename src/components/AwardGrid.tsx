import { useState } from 'react'
import {
  Cpu,
  FileText,
  Handshake,
  Lightbulb,
  Megaphone,
  Minus,
  PencilRuler,
  Star,
  Trophy,
  type LucideIcon,
} from 'lucide-react'

export type AwardIconName =
  | 'trophy'
  | 'handshake'
  | 'cpu'
  | 'ruler'
  | 'lightbulb'
  | 'star'
  | 'megaphone'
  | 'file'
  | 'minus'

export type AwardItem = {
  title: string
  placement: string
  description: string
  icon: AwardIconName
}

type AwardGridProps = {
  awards: AwardItem[]
  ariaLabel: string
}

function getPlacementRank(placement: string) {
  const normalized = placement.toLowerCase()

  if (normalized.includes('1st')) return 1
  if (normalized.includes('2nd')) return 2
  if (normalized.includes('3rd')) return 3

  const numericMatch = normalized.match(/\d+/)
  if (numericMatch) {
    return Number.parseInt(numericMatch[0], 10)
  }

  return Number.POSITIVE_INFINITY
}

const iconMap: Record<AwardIconName, LucideIcon> = {
  trophy: Trophy,
  handshake: Handshake,
  cpu: Cpu,
  ruler: PencilRuler,
  lightbulb: Lightbulb,
  star: Star,
  megaphone: Megaphone,
  file: FileText,
  minus: Minus,
}

export default function AwardGrid({ awards, ariaLabel }: AwardGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sortedAwards = [...awards].sort((left, right) => {
    const placementDifference = getPlacementRank(left.placement) - getPlacementRank(right.placement)

    if (placementDifference !== 0) {
      return placementDifference
    }

    return left.title.localeCompare(right.title)
  })

  return (
    <div className="award-pill-grid" role="group" aria-label={ariaLabel}>
      {sortedAwards.map((award, index) => {
        const Icon = iconMap[award.icon]
        const isActive = activeIndex === index

        return (
          <button
            key={`${award.title}-${award.placement}`}
            type="button"
            className={`award-pill ${isActive ? 'is-active' : ''}`}
            aria-label={`${award.title}. ${award.placement}. ${award.description}`}
            aria-pressed={isActive}
            onClick={() => setActiveIndex(isActive ? null : index)}
          >
            <span className="award-pill__inner" aria-hidden="true">
              <span className="award-pill__face award-pill__front">
                <span className="award-pill__headline">
                  <span className="award-pill__icon">
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <span className="award-pill__title">{award.title}</span>
                </span>
                <span className="award-pill__placement award-pill__placement--front">{award.placement}</span>
              </span>
              <span className="award-pill__face award-pill__back">
                <span className="award-pill__placement">{award.placement}</span>
                <span className="award-pill__detail">{award.description}</span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
