import React, {Component} from 'react'

import Aux from '../Aux/Aux';
import styles from './Layout.module.css'
import ToolBar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer'


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer})
    }
    render() {
        return (
            <Aux>
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <Sidedrawer 
                    open = {this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />

                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout
