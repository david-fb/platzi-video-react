import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Footer from '../components/Footer'
import '../assets/styles/Home.scss'
import useInitialState from '../hooks/useInitialState'

const API = 'http://localhost:3000/initalState'

const Home = () => {
const initialState = useInitialState(API)
return initialState === 0 ? <h1>Loading...</h1>:(
    <>
        <Search />
        {initialState.mylist.length > 0 &&
            <Categories title="Mi Lista">
            <Carousel>
                {initialState.mylist.map(item => (
                    <CarouselItem key={item.id} {...item}/>
                    ))
                }
            </Carousel>
            </Categories>
        }
        
        {initialState.trends.length > 0 &&
            <Categories title="Tendencias">
            <Carousel>
                {initialState.trends.map(item => (
                    <CarouselItem key={item.id} {...item}/>
                    ))
                }
            </Carousel>
            </Categories>
        }

        {initialState.originals.length > 0 &&
            <Categories title="Originales">
            <Carousel>
                {initialState.originals.map(item => (
                    <CarouselItem key={item.id} {...item}/>
                    ))
                }
            </Carousel>
            </Categories>
        }
    </>
)
}

export default Home