// ResizablePanel.tsx

import { useState, useEffect, useRef } from 'react'

interface ResizablePanelProps {
  children: React.ReactNode
  width: number
  minWidth: number
  handleLeft?: boolean
  handleRight?: boolean
  className?: string
  // onWidthChange?: (newWidth: number) => void  
}

interface ResizeHandleProps {
  position:'left'|'right'
  onMouseDown: (position: 'left' | 'right', e: React.MouseEvent) => void
}

function ResizeHandle({position, onMouseDown}: ResizeHandleProps) {
  let outerCss = ''
  let innerCss = ''
  switch (position) {
    case 'left':
      outerCss = 'left-0 top-0 bottom-0 w-3'
      innerCss = 'left-0 top-1 bottom-1 w-1'
      break
    case 'right':
      outerCss = 'right-0 top-0 bottom-0 w-3'
      innerCss = 'right-0 top-1 bottom-1 w-1'
      break
  }

  return (
      <div
        className={outerCss + " absolute cursor-col-resize z-10"}
        onMouseDown={e => onMouseDown(position, e)} 
      >
        <div className={innerCss + " absolute rounded-full"} />
      </div>
  )
}

export default function ResizablePanel({
  children,
  width,
  minWidth,
  handleLeft,
  handleRight,
  // onWidthChange
  className
}: ResizablePanelProps) {

  width = width ?? minWidth

  const [innerWidth, setInnerWidth] = useState(width)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInnerWidth(width)
  }, [width])

  function handleMouseDown(position:'left'|'right', e: React.MouseEvent) {

    e.preventDefault()

    const startX = e.clientX
    const startWidth = ref.current!.getBoundingClientRect().width
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    function handleMouseMove(e: MouseEvent) {
      const delta = (position === 'left' ? -1 : 1) * (e.clientX - startX)
      const newWidth = Math.max(minWidth, startWidth + delta)
      
      setInnerWidth(newWidth)
      // if (onWidthChange)
      //   onWidthChange(newWidth)
      e.preventDefault();
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

  }
    
  return (
    <div className={"relative h-full " + className}>
      { handleLeft ? <ResizeHandle position='left' onMouseDown={handleMouseDown} /> : null}
      { handleRight ? <ResizeHandle position='right' onMouseDown={handleMouseDown} /> : null}

      {/* Resizable Panel */}
      <div
        ref={ref}
        className="min-h-full min-w-100 overflow-auto"
        style={{width:innerWidth}}
      >
        
        {/* Children */}
        {children}
      </div>

    </div>
  )

}