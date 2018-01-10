import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Create from './Create'
import Detail from './Detail'

const Details = () => (
    <Switch>
        <Route path="/post/create" component={Create} />
        <Route path="/post/details/:parentid/:id" component={Detail} />
        <Route path="/post/details/:id" component={Detail} />
    </Switch>
)

export default Details