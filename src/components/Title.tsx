import React from "react"
import styled from "styled-components"

interface Props {
   text: string
}

const Container = styled.div`
   display: flex;
   gap: 78px;
   position: absolute;
   top: 50px;
`
const Line = styled.div`
   width: 5px;
   height: 120px;
   background: linear-gradient(to bottom, #3877ee, #ef5da8);
`
const Text = styled.h1`
   font-family: PT Sans;
   font-size: 56px;
   font-weight: 700;
   line-height: 67.2px;
   text-align: left;
   color: #42567a;
   width: 353px;
   margin: 0px;
   position: relative;
   top: -15px;
`

const Title: React.FC<Props> = ({ text }) => {
   return (
      <Container>
         <Line />
         <Text>{text}</Text>
      </Container>
   )
}

export default Title
