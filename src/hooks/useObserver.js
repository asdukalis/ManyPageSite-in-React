import { useEffect, useRef } from "react";
export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();

  useEffect(() => {
    // console.log('useObserver ref.current:', ref.current);
    // console.log('useObserver canLoad:', canLoad, 'isLoading:', isLoading);
    const currentRef = ref.current;

    if (isLoading) return;
    if (!canLoad) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    const cb = (entries) => {
      // console.log('IntersectionObserver callback', {
      //   isIntersecting: entries[0].isIntersecting,
      //   canLoad,
      //   isLoading,
      // });
      if (entries[0].isIntersecting && canLoad) {
        // console.log('Вызван callback для подгрузки');
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);

    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, canLoad, callback, ref]);
};
