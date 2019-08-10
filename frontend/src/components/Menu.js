import React from 'react'
import { Menu as SMenu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/mainReducer'
import store from '../store';

const Menu = ({ store }) => {

    return (
        <div>
            <SMenu compact>
                <SMenu.Item>
                    <Link to="/blogs">Blogit</Link>
                </SMenu.Item>
                <SMenu.Item>
                    <Link to="/create">Luo uusi</Link>
                </SMenu.Item>
                <SMenu.Item color="red">
                    <Link to="/login" onClick={() => { store.dispatch(logoutUser()) }}>Kirjaudu ulos</Link>
                </SMenu.Item>
            </SMenu>
        </div>
    )
}

export default Menu