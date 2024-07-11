import React from "react"
import styled from "styled-components"

interface Props {
   start: number
   end: number
}

const Container = styled.div`
   display: flex;
   gap: 50px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 3;
`
const Start = styled.h2`
   font-family: PT Sans;
   font-size: 130px;
   font-weight: 700;
   line-height: 160px;
   letter-spacing: -0.02em;
   text-align: center;
   color: rgb(93, 95, 239);
   margin: 0px;
`
const End = styled.h1`
   font-family: PT Sans;
   font-size: 130px;
   font-weight: 700;
   line-height: 160px;
   letter-spacing: -0.02em;
   text-align: center;
   color: rgb(239, 93, 168);
   margin: 0px;
`

const Timestep: React.FC<Props> = ({ start, end }) => {
   return (
      <Container>
         <Start>{start}</Start>
         <End>{end}</End>
      </Container>
   )
}

export default Timestep
