import React, { ImgHTMLAttributes } from 'react'

import classNames from 'classnames'

import Flexbox from '@/view/components/shared/flexbox'

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

function Image(props: ImageProps) {
  const { src, alt, ...restProps } = props
  return (
    <picture>
      <source srcSet={src} />
      <img src={'/images/image_404.jpg'} alt={alt} {...restProps} />
    </picture>
  )
}

export default Image

interface FlexImageProps extends ImageProps {
  objectFit?: 'none' | 'contain' | 'cover' | 'fill' | 'scale-down'
  condition?: boolean
}
export const FlexImage: React.FC<FlexImageProps> = ({
  className,
  objectFit = 'contain',
  condition = true,
  alt,
  ...props
}) => {
  if (!condition) return null
  return (
    <Flexbox className={classNames(className, 'overflow-hidden')}>
      <Image
        className={classNames('w-full', 'h-full', {
          'object-none': objectFit === 'none',
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
          'object-fill': objectFit === 'fill',
          'object-scale-down': objectFit === 'scale-down'
        })}
        {...props}
        alt={alt}
      />
    </Flexbox>
  )
}
