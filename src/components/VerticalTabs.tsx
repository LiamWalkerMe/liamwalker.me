import { useEffect, useState, type ReactNode } from 'react'

export type VerticalTab = {
  label: string
  content: ReactNode
}

type VerticalTabsProps = {
  idPrefix: string
  tabs: VerticalTab[]
  autoRotate?: boolean
  autoRotateMs?: number
}

export default function VerticalTabs({ idPrefix, tabs, autoRotate = false, autoRotateMs = 4000 }: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [idPrefix])

  useEffect(() => {
    if (!autoRotate || tabs.length < 2) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length)
    }, autoRotateMs)

    return () => window.clearInterval(interval)
  }, [autoRotate, autoRotateMs, tabs.length])

  const panelId = `${idPrefix}-panel`
  const activeButtonId = `${idPrefix}-tab-${activeIndex}`

  return (
    <div className="vertical-tabs">
      <div className="vertical-tabs__list" role="tablist" aria-label={`${idPrefix} tabs`}>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex
          const buttonId = `${idPrefix}-tab-${index}`
          return (
            <button
              key={tab.label}
              id={buttonId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className={`vertical-tabs__button${isActive ? ' active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="vertical-tabs__panel" role="tabpanel" id={panelId} aria-labelledby={activeButtonId}>
        {tabs[activeIndex]?.content}
      </div>
    </div>
  )
}
