import React from 'react'
import '../assets/styles/components/Categories.scss'

const Categories = ({title, children})=> (
    <React.Fragment>
        <h3 className="categories__title">{title}</h3>
        {children}
    </React.Fragment>
)

export default Categories