import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Create from './Create'
import Detail from './Detail'
import Error404 from './Error404'

const App = () => (
    <Switch>
        <Route path="/:category/post/create" component={Create} />
        <Route path="/:category/post/:parentid/:id" component={Detail} />
        <Route path="/:category/post/:id" component={Detail} />
        <Route path='/:category' component={Main} />
        <Route exact path='/' component={Main} />
        <Route component={Error404}/>
    </Switch>
)

export default withRouter(App);
