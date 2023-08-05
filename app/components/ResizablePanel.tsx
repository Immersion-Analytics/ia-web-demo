// ResizablePanel.tsx

import { useState, useEffect, useRef } from 'react'

interface ResizablePanelProps {
  children: React.ReactNode
  initialWidth: number
  minWidth: number
  handleLeft?: boolean
  handleRight?: boolean
  className?: string
  onWidthChanged?: (width: number) => void  
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
        <div className={innerCss + " absolute rounded-full"} >
          {/* <div className="w-1 h-5 border-x border-neutral-400/20 -translate-y-4 absolute top-1/2"></div> */}
        </div>
      </div>
  )
}

export default function ResizablePanel({
  children,
  initialWidth,
  minWidth,
  handleLeft,
  handleRight,
  onWidthChanged,
  className
}: ResizablePanelProps) {

  // initialWidth = initialWidth ?? minWidth

  const [innerWidth, setInnerWidth] = useState(initialWidth)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInnerWidth(initialWidth)
  }, [initialWidth])

  function handleMouseDown(position:'left'|'right', e: React.MouseEvent) {

    e.preventDefault()

    const startX = e.clientX
    // const startWidth = ref.current!.getBoundingClientRect().width
    const startWidth = innerWidth;
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    function handleMouseMove(e: MouseEvent) {
      const delta = (position === 'left' ? -1 : 1) * (e.clientX - startX)
      const newWidth = Math.max(minWidth, startWidth + delta)
      
      setInnerWidth(newWidth)
      e.preventDefault();

      onWidthChanged?.(newWidth)
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