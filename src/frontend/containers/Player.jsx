import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../assets/styles/components/Player.scss'
import { getVideoSource } from '../actions'
import { Redirect } from 'react-router-dom'

const Player = props => {
    const { id } = props.match.params
    const hasPlaying = Object.keys(props.playing).length > 0

    const [loading, setLoading] = useState(true)

    useLayoutEffect(()=> {
        props.getVideoSource(id)
        setLoading(false)
    }, [])

    if(loading){
        return <h2>Loading...</h2>
    }
    return hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4"/>
            </video>
            <div className="Player-back">
                <button type="button" onClick={()=> props.history.goBack()}> Regresar </button>
            </div>
        </div>
    )
    :
    <Redirect to='/404/' />
}

const mapStateToProps = state => {
    return {
        playing: state.playing,
    }
}

const mapDispatchToProps = {
    getVideoSource,
}

export default connect(mapStateToProps,mapDispatchToProps)(Player)