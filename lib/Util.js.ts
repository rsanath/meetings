export function delay(duration: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

export function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
