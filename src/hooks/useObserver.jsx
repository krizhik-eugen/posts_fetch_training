import {useEffect, useRef} from 'react';

const UseObserver = (ref, isLoadable, isLoading, callback) => {
    const scrollObserver = useRef(null)
    useEffect(() => {
        if (isLoading) return
        if (scrollObserver.current) scrollObserver.current.disconnect()
        const cb = function (entries, observer) {
            if (entries[0].isIntersecting && isLoadable) {
                callback()
            }
        }
        scrollObserver.current = new IntersectionObserver(cb)
        scrollObserver.current.observe(ref.current)
    }, [isLoading]);

};

export default UseObserver;