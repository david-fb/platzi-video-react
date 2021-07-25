import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutRequest } from '../actions'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import gravatar from '../utils/gravatar'
import LogoPlatziVideo from '../assets/static/logo-platzi-video-BW2.png'
import userIcon from '../assets/static/user-icon.png'
import '../assets/styles/components/Header.scss'

const Header = props => {
    const { user, isLogin, isRegister } = props
    const hasUser = Object.keys(user).length > 0

    const handleLogout = () => {
        props.logoutRequest({})
    }

    const headerClass = classNames('header',{
        isLogin,
        isRegister,
    })

    return(
        <header className={headerClass}>
                <Link to="/">
                    <img className="header__img" src={LogoPlatziVideo} alt="Platzi Video"/>
                </Link>               
                    <div className="header__menu">
                        <div className="header__menu--profile">
                            {hasUser ?
                            <img src={gravatar(user.email)} alt={user.email} />
                            :
                            <img src={userIcon} alt="user icon"/>
                            }
                            
                            
                                <p>Perfil</p>
                        </div>
                        <ul>
                            {hasUser ?
                            <li><Link to="/">{user.email}</Link></li>
                            : null
                            }
                            
                            {hasUser ?
                            <li><a href="#logout" onClick={handleLogout}>Cerrar Sesión</a></li>
                            :
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                            }
                            
                        </ul>
                    </div>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object,
    hasUser: PropTypes.bool,
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {
    logoutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)