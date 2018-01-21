import React from 'react'
import { withRouter, Switch, Route, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
import Main from './Main'
import Create from './Create'
import Detail from './Detail'
import Error404 from './Error404'

class App extends React.Component {

    componentDidMount(){
        this.props.fetchPosts();
        this.props.fetchCategories();
    }

    componentDidUpdate() {
        // 404 logic // ensure loaded // validate urls
        // over complicated but the url-params presented themself as challenging
        const { categories, posts, comments, loaded } = this.props;
        const pathname = this.props.location.pathname;
        let match;

        if(loaded.categories){
            match = matchPath(pathname, { path: '/category/:category' });
            if(match){
                const { category } = match.params;
                if(category && categories.filter(c => c.name===category).length===0){
                    this.props.history.push("/404");
                    return;
                }
            }
        }

        if(loaded.posts && loaded.comments){
            match = matchPath(pathname, { path: '/category/:category/post/:id' });
            if(match){
                const { id } = match.params;
                if(id && !posts[id] && !comments[id]){
                    this.props.history.push("/404");
                    return;
                }
            }

            match = matchPath(pathname, { path: '/category/:category/post/:parentid/:id' });
            if(match){
                const { id } = match.params;
                if(id && !posts[id] && !comments[id]){
                    this.props.history.push("/404");
                    return;
                }
            }
        }
    }

    render(){
        return(
            <Switch>
                <Route path="/category/:category/create" component={Create} />
                <Route path="/category/:category/post/:parentid/:id" component={Detail} />
                <Route path="/category/:category/post/:id" component={Detail} />
                <Route path='/category/:category' component={Main} />
                <Route exact path='/' component={Main} />
                <Route component={Error404}/>
            </Switch>
        )
    }
}

function mapStateToProps ({ categories, posts, comments, loaded }) {
    return { categories, posts, comments, loaded };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))