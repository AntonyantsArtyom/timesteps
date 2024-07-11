import React, { useMemo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import Timestep from "./Timestep"
import TimestepButton from "./TimestepButton"
import Left from "../assets/left"
import Right from "../assets/right"

gsap.registerPlugin(MotionPathPlugin)

interface Timestep {
   id: number
   active: boolean
   start: number
   end: number
}

interface Props {
   onTimestepClick: (id: number) => void
   timesteps: Timestep[]
}

const Container = styled.div`
   position: absolute;
   width: 400px;
   height: 400px;
   display: flex;
   justify-content: center;
   align-items: center;
   top: calc(50% - 120px);
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 3;
`

const VerticalLine = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   width: 1px;
   height: 100%;
   transform: translate(-50%, -50%);
   background-color: #42567a;
`

const HorizontalLine = styled.div`
   transform: translate(-50%, -50%);
   position: absolute;
   top: calc(50% - 120px);
   left: 50%;
   width: 100%;
   height: 1px;
   background-color: #42567a;
`

const Circle = styled.div`
   position: absolute;
   width: 400px;
   height: 400px;
   border-radius: 50%;
   border: 1px solid #42567a;
   z-index: -1;
`

const NextPrevButton = styled.button<{ direction: string; active: boolean }>`
   width: 50px;
   height: 50px;
   border: 1px solid #42567a80;
   border-radius: 50%;
   background: #fff;
   cursor: pointer;
   position: absolute;
   display: grid;
   place-content: center;
   left: ${({ direction }) => (direction === "next" ? "150px" : "80px")};
   ${({ active }) => (!active ? "opacity: 0.5" : "")};
   bottom: 235px;
`

const TimestepSwapper: React.FC<Props> = ({ onTimestepClick, timesteps }) => {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [currentIncrease, setCurrentIncrease] = useState(0)
   const numItems = timesteps.length
   const radius = 200
   const start = timesteps.find((timestep) => timestep.active)?.start ?? 0
   const end = timesteps.find((timestep) => timestep.active)?.end ?? 0

   const items = useMemo(
      () =>
         timesteps.map((timestep, i) => {
            const angle = (((i + currentIndex) % numItems) * (2 * Math.PI)) / numItems
            const x = radius * Math.cos(angle)
            const y = radius * Math.sin(angle)
            return { x, y, id: timestep.id, active: timestep.active }
         }),
      [currentIndex, numItems, timesteps, radius]
   )

   const itemRefs = useRef<(HTMLDivElement | null)[]>([])

   useEffect(() => {
      items.forEach((item, i) => {
         if (itemRefs.current[i]) {
            const angleStart = ((i - currentIncrease + currentIndex) * 360) / numItems
            const angleEnd = ((i + currentIndex) * 360) / numItems

            const generatePointsAlongArc = (startAngle: number, endAngle: number, radius: number) => {
               const numPoints = 150
               const points = []

               for (let i = 0; i <= numPoints; i++) {
                  const angle = startAngle + (endAngle - startAngle) * (i / numPoints)
                  const x = radius * Math.cos(angle * (Math.PI / 180))
                  const y = radius * Math.sin(angle * (Math.PI / 180))
                  points.push({ x, y })
               }

               return points
            }

            const points = generatePointsAlongArc(angleStart, angleEnd, radius)

            gsap.to(itemRefs.current[i], {
               motionPath: {
                  path: points,
                  curviness: 1.25,
                  autoRotate: false,
               },
               duration: 1,
               ease: "power1.inOut",
            })
         }
      })
   }, [items, currentIndex])

   const handleCircleButtonClick = (id: number) => {
      if (timesteps.find((timestep) => timestep.active)?.id === id) return null
      let increase = timesteps.find((timestep) => timestep.active)?.id! - id
      console.log(increase)
      setCurrentIndex((prevIndex) => {
         return prevIndex + increase
      })
      setCurrentIncrease(increase)
      onTimestepClick(id)
   }
   const handleNext = () => {
      let increase = -1
      setCurrentIndex((prevIndex) => {
         return prevIndex + increase
      })
      setCurrentIncrease(increase)
      onTimestepClick(timesteps.find((timestep) => timestep.active)?.id! + 1)
   }
   const handlePrev = () => {
      let increase = 1
      setCurrentIndex((prevIndex) => {
         return prevIndex + increase
      })
      setCurrentIncrease(increase)
      onTimestepClick(timesteps.find((timestep) => timestep.active)?.id! - 1)
   }
   return (
      <>
         <VerticalLine />
         <HorizontalLine />
         <Container>
            <Timestep start={start} end={end} />
            <Circle />

            {items.map((item, index) => (
               <TimestepButton
                  key={item.id}
                  x={item.x}
                  y={item.y}
                  id={item.id}
                  active={item.active}
                  onClick={() => handleCircleButtonClick(item.id)}
                  ref={(el) => (itemRefs.current[index] = el)}
               />
            ))}
         </Container>
         <NextPrevButton
            direction="prev"
            onClick={() => handlePrev()}
            active={timesteps.find((timestep) => timestep.active)?.id! != 1}
            disabled={!(timesteps.find((timestep) => timestep.active)?.id! != 1)}
         >
            <Left />
         </NextPrevButton>
         <NextPrevButton
            direction="next"
            onClick={() => handleNext()}
            active={timesteps.find((timestep) => timestep.active)?.id! != timesteps.length}
            disabled={!(timesteps.find((timestep) => timestep.active)?.id! != timesteps.length)}
         >
            <Right />
         </NextPrevButton>
      </>
   )
}

export default TimestepSwapper
