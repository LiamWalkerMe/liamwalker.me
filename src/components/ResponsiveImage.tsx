import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import { buildResponsiveSrcSet, getLargestResponsiveSource, type ResponsiveImageAsset } from '../lib/responsiveImages'

interface ResponsiveImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'srcSet' | 'sizes'> {
  asset: ResponsiveImageAsset
  sizes: string
  pictureClassName?: string
  pictureStyle?: CSSProperties
}

export default function ResponsiveImage({
  asset,
  sizes,
  pictureClassName,
  pictureStyle,
  alt,
  width,
  height,
  ...imgProps
}: ResponsiveImageProps) {
  const fallbackSource = getLargestResponsiveSource(asset.sources.fallback)

  return (
    <picture
      className={pictureClassName}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        ...pictureStyle,
      }}
    >
      {asset.sources.avif.length > 0 && (
        <source type="image/avif" srcSet={buildResponsiveSrcSet(asset.sources.avif)} sizes={sizes} />
      )}
      {asset.sources.webp.length > 0 && (
        <source type="image/webp" srcSet={buildResponsiveSrcSet(asset.sources.webp)} sizes={sizes} />
      )}
      <img
        {...imgProps}
        src={fallbackSource.src}
        srcSet={buildResponsiveSrcSet(asset.sources.fallback)}
        sizes={sizes}
        alt={alt}
        width={width ?? asset.width}
        height={height ?? asset.height}
      />
    </picture>
  )
}
