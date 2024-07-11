import React, { useState } from "react"
import styled from "styled-components"
import EventInformation from "./EventInformation"

interface Event {
   year: number
   text: string
}

interface Props {
   events: Event[]
}

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import SwiperCore from "swiper"

SwiperCore.use([Navigation, Pagination])

const Container = styled.div`
   max-width: 1200px;
   position: absolute;
   bottom: 20px;
   left: 83px;
`

const EventList: React.FC<Props> = ({ events }) => {
   return (
      <Container>
         <Swiper spaceBetween={80} slidesPerView={events.length > 2 ? 3 : events.length} grabCursor={true} pagination={{ clickable: true }}>
            {events.map((event, index) => (
               <SwiperSlide key={index}>
                  <EventInformation year={event.year} text={event.text} />
               </SwiperSlide>
            ))}
         </Swiper>
      </Container>
   )
}

export default EventList
