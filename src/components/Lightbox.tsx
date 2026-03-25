import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type LightboxProps = {
  src: string
  alt: string
  onClose: () => void
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('aria-hidden'))
}

export default function Lightbox({ src, alt, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const requestClose = useCallback(() => {
    setIsClosing(true)
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    const raf = window.requestAnimationFrame(() => {
      setIsOpen(true)
      closeButtonRef.current?.focus({ preventScroll: true })
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = getFocusableElements(dialogRef.current)

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(raf)
      document.body.style.overflow = previousBodyStyles.overflow
      document.body.style.position = previousBodyStyles.position
      document.body.style.top = previousBodyStyles.top
      document.body.style.left = previousBodyStyles.left
      document.body.style.right = previousBodyStyles.right
      document.body.style.width = previousBodyStyles.width
      document.removeEventListener('keydown', handleKeyDown)

      window.scrollTo({ top: scrollY, left: scrollX, behavior: 'auto' })

      if (restoreFocusRef.current?.isConnected) {
        restoreFocusRef.current.focus({ preventScroll: true })
      }
    }
  }, [requestClose])

  useEffect(() => {
    if (!isClosing) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      onClose()
    }, 220)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isClosing, onClose])

  return createPortal(
    <div
      ref={dialogRef}
      className={`lightbox${isOpen ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      data-lightbox-root="true"
      aria-label={`Expanded image: ${alt}`}
      onClick={requestClose}
    >
      <button
        ref={closeButtonRef}
        className="lightbox-close"
        type="button"
        aria-label="Close image"
        onClick={(event) => {
          event.stopPropagation()
          requestClose()
        }}
      >
        <X size={20} aria-hidden="true" />
      </button>
      <img
        src={src}
        alt={alt}
        data-lightbox-image="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body
  )
}
