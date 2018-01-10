import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPrevious, setCategory } from '../actions'
import Main from './Main'
import Create from './Create'
import Detail from './Detail'
import Error404 from './Error404'

class App extends React.Component {

    /*componentDidMount(){
        this.setCategory();
    }

    componentDidUpdate(prevProps) {
        // setting previous to support back button logic
        console.log('this.props', this.props)
        if (this.props.location !== prevProps.location) {
            this.props.setPrevious(prevProps.location);
        }
        this.setCategory();
    }

    setCategory() {
       // const pathname = this.props.location.pathname;
        //const category = (pathname === '/' && 'all') || pathname.match(/([^/]+)$/g)[0];
        console.log('props >>>>>+++++----', this.props)
        //this.props.setCategory(category);
    }*/

    render(){
        return(
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/:category' component={Main} />
                <Route path="/:category/post/create" component={Create} />
                <Route path="/:category/post/:parentid/:id" component={Detail} />
                <Route path="/:category/post/:id" component={Detail} />
                <Route component={Error404}/>
            </Switch>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setPrevious: (data) => dispatch(setPrevious(data)),
        setCategory: (data) => dispatch(setCategory(data))
    }
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(App));
