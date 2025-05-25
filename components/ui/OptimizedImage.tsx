import React from 'react';
import Image, { ImageProps } from 'next/image';
import { imageLoader, getOptimalImageSize } from '@/lib/image-optimization';

interface OptimizedImageProps extends Omit<ImageProps, 'loader' | 'quality'> {
  quality?: number;
  priority?: boolean;
  size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'xlarge' | 'full';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '',
  width,
  height,
  quality = 75,
  priority = false,
  size,
  className = '',
  ...props
}) => {
  // Determinar el ancho óptimo si se proporciona un tamaño predefinido
  const optimalWidth = size ? getOptimalImageSize(Number(width || 0)) : width;
  
  return (
    <Image
      src={src}
      alt={alt}
      width={optimalWidth || width}
      height={height}
      loader={imageLoader}
      quality={quality}
      priority={priority}
      className={`${className} transition-opacity duration-200`}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
};

export default OptimizedImage;
