import React from 'react'

const OptimizedImage = ({ src, alt, className, onError }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={onError}
      loading="lazy"
      decoding="async"
    />
  )
}

export default OptimizedImage