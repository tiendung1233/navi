/* eslint-disable react/display-name */
import { forwardRef, HTMLProps, ReactNode, useRef } from 'react'
import { useStore } from "~/libs/external-store";
import { activeSlideState } from '~/util/store';

interface CarouselProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode | ReactNode[]
}



export const useCarousel = (id: string) => {
  // Specify the type for sliderRef as HTMLDivElement or null
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Assuming activeSlideState is a recoil state that accepts a string ID and returns a number
  const { activeSlide } = useStore(activeSlideState, state => state)
  const prev = () => {
    const prevSlide = activeSlide > 0 ? activeSlide - 1 : 0;
    sliderRef.current?.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: 'smooth'
    });
    activeSlideState.setState((prev) => ({
      ...prev,
      activeSlide: prevSlide
    }))
  };

  const next = () => {
    const slides = sliderRef.current?.querySelectorAll('.slide__item');
    const nextSlide = activeSlide < (slides?.length ?? 0) - 1 ? activeSlide + 1 : 0;
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth'
    });
    activeSlideState.setState((prev) => ({
      ...prev,
      activeSlide: nextSlide
    }))
  };

  return {
    activeSlide,
    sliderRef,
    prev,
    next
  };
};


const Carousel = forwardRef((props: CarouselProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { children, ...restProps } = props
  const sliderRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className="slide"
      {...restProps}
      ref={(node) => {
        if (node !== null) {
          let timer: string | number | NodeJS.Timeout | undefined
          let activeIndex: number
          sliderRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          const slides = node.querySelectorAll(':scope > div')
          const observer = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                // update slide
                if (entry.isIntersecting) {
                  activeIndex = Array.from(slides).indexOf(entry.target) + 1
                }
              })
            },
            {
              root: node,
              threshold: 0.99
            }
          )
          // update state when scroll end
          sliderRef.current.addEventListener('scroll', function () {
            clearTimeout(timer)
            timer = setTimeout(() => {
              activeSlideState.setState((prev) => ({
                ...prev,
                activeSlide: activeIndex
              }))
              // setActiveSlide(activeIndex)
            }, 100)
          })
          // Watch all the slides.
          slides.forEach((slide) => observer.observe(slide))
        }
      }}>
      {children}
    </div>
  )
})

export default Carousel
