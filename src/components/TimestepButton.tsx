import React from "react"
import styled from "styled-components"

interface Props {
   id: number
   x: number
   y: number
   active: boolean
   onClick: Function
}

const Container = styled.div<{ x: number; y: number; active: boolean }>`
   position: absolute;
   width: ${({ active }) => (active ? `56px` : `10px`)};
   height: ${({ active }) => (active ? `56px` : `10px`)};
   background-color: ${({ active }) => (active ? `#fff` : `#42567a`)};
   border-radius: 50%;
   ${({ active }) => (active ? `border: 1px solid #42567a` : ``)};
   display: flex;
   justify-content: center;
   align-items: center;
   color: #42567a;
   font-weight: bold;
   transform: translate(${({ x, y }) => `${x}px, ${y}px`});
   z-index: 3;
   font-family: PT Sans;
   font-size: 20px;
   font-weight: 400;
   line-height: 30px;
   cursor: pointer;
`

const TimestepButton = React.forwardRef<HTMLDivElement, Props>(({ id, x, y, active, onClick }, ref) => {
   return (
      <Container ref={ref} x={x} y={y} active={active} onClick={() => onClick()}>
         {active && <>{id}</>}
      </Container>
   )
})

export default TimestepButton
