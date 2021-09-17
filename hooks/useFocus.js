import { useRef } from "react"

export const useFocus = () => {
	const elementRef = useRef(null)
	const setFocus = () => { elementRef.current && elementRef.current.focus()}
	return [elementRef, setFocus]
}
