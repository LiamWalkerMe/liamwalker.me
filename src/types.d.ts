import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string
      poster?: string
      'environment-image'?: string
      'auto-rotate'?: boolean
      'camera-controls'?: boolean
      'disable-zoom'?: boolean
      'shadow-intensity'?: string
    }
  }
}
