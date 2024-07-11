import React from "react"
import styled from "styled-components"

interface Props {
   year: number
   text: string
}

const Container = styled.div`
   width: 320px;
`

const Year = styled.h1`
   color: #3877ee;
   font-size: 25px;
   font-weight: 400;
   line-height: 30px;
   text-align: left;
`

const Text = styled.p`
   font-size: 20px;
   font-weight: 400;
   line-height: 30px;
   text-align: left;
`

const EventInformation: React.FC<Props> = ({ text, year }) => {
   return (
      <Container>
         <Year>{year}</Year>
         <Text>{text}</Text>
      </Container>
   )
}

export default EventInformation
