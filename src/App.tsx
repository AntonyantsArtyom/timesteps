import React, { useCallback, useState } from "react"
import TimestepSwapper from "./components/TimestepSwapper"
import EventList from "./components/EventList"
import Title from "./components/Title"
import { styled } from "styled-components"

const Container = styled.div`
   width: 1440px;
   height: 100vh;
   border-left: 1px solid #42567a;
   border-right: 1px solid #42567a;
   margin-left: 40px;
   position: relative;
`

const App: React.FC = () => {
   const [timesteps, setTimesteps] = useState([
      {
         id: 1,
         start: 1947,
         end: 1950,
         active: false,
         events: [{ year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды" }],
      },
      {
         id: 2,
         start: 1950,
         end: 1956,
         active: false,
         events: [
            { year: 2016, text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
            { year: 2017, text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi" },
            { year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды" },
            { year: 2016, text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
            { year: 2017, text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi" },
            { year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды" },
            { year: 2016, text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
            { year: 2017, text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi" },
         ],
      },
      {
         id: 3,
         start: 2015,
         end: 2017,
         active: true,
         events: [
            { year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды" },
            { year: 2016, text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
            { year: 2017, text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi" },
            { year: 2017, text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi" },
         ],
      },
   ])
   const onTimestepClick = (id: number) => {
      setTimesteps((timesteps) => {
         return timesteps.map((timestep) => {
            return { ...timestep, active: timestep.id === id }
         })
      })
   }
   return (
      <Container>
         <Title text="Исторические даты" />
         <TimestepSwapper timesteps={timesteps} onTimestepClick={onTimestepClick} />
         <EventList events={timesteps.find((timestep) => timestep.active)!.events!} />
      </Container>
   )
}

export default App
