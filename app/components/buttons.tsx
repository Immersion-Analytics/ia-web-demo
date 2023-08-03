import { useState } from "react"

interface ButtonProps {
    children: React.ReactNode
    className?: string
    onClick: (e: React.MouseEvent) => void
}

/// Button which prevents click firing when pointer has dragged first
export function IAButton({children, className, onClick}: ButtonProps)
{
    const [mouseStart, setMouseStart] = useState({x:NaN, y:NaN})
    const [dragging, setDragging] = useState(false)
    function filterClick(e:React.MouseEvent) {
        if (dragging) {
            return;
        }
        onClick(e)
    }

    function processMouseDown(x:number, y:number) {
        setMouseStart({x:x, y:y})
        setDragging(false)
    }

    function processMouseMove(x:number, y:number) {
        if (Math.abs(mouseStart.x - x) > 5 || Math.abs(mouseStart.y - y) > 5) {
            setDragging(true)
        }
    }

    return (
        <button className={className}
            onClick={filterClick}
            onMouseDown={(e) => processMouseDown(e.clientX, e.clientY)}
            onTouchStart={(e) => processMouseDown(e.touches[0].clientX, e.touches[0].clientY)}
            onMouseMove={(e) => processMouseMove(e.clientX, e.clientY)}
            onTouchMove={(e) => processMouseMove(e.touches[0].clientX, e.touches[0].clientY)}
            >
            {children}
        </button>
    )
}