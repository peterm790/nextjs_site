import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import images from '../data/profile-images.json'
import styles from './ProfileCarousel.module.css'

export default function ProfileCarousel() {
  const [startIndex] = useState(() => Math.floor(Math.random() * images.length))
  const autoScroll = useRef(
    AutoScroll({
      playOnInit: true,
      speed: 0.8,
      startDelay: 900,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  )
  const [carouselRef, carouselApi] = useEmblaCarousel(
    {
      align: 'center',
      dragFree: true,
      loop: true,
      startIndex,
      watchDrag: false,
    },
    [autoScroll.current]
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carouselApi?.plugins()?.autoScroll?.stop()
    }
  }, [carouselApi])

  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={styles.viewport} ref={carouselRef}>
        <div className={styles.track}>
          {images.map((image, index) => (
            <div
              className={styles.slide}
              key={image.src}
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
            >
              <img
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                loading={index === startIndex ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
