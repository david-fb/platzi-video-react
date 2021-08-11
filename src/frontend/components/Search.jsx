import React from 'react'
import '../assets/styles/components/Search.scss'

const main_title_text = '¿Que quieres ver hoy?'
const main_input_placeholder = 'Buscar...'
const Search = () => (
    <section className='main'>
        <h2 className="main__title">{main_title_text}</h2>
        <input type="text" className='input' placeholder={main_input_placeholder} />
    </section>
)

export default Search