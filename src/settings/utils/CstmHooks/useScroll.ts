interface useScrollType {
    hide: () => void,
    show: () => void,
}
export const useScroll = (type?: boolean):useScrollType => {
    const hide = () => {
        document.body.style.overflow = "hidden"
    }
    const show = () => {
        document.body.style.overflow = ""
    }
    return {
        hide,
        show
    }
}