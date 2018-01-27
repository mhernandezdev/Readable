import React from 'react'
import { withRouter, Switch, Route, matchPath } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions/APIActions'
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

        // simplified urls require allowing few exception
        const exceptions = ['404','create'];

        let match;

        if(loaded.categories){
            match = matchPath(pathname, { path: '/:category' });
            if(match){
                const { category } = match.params;
                if(category && exceptions.indexOf(category)===-1 && categories.filter(c => c.name===category).length===0){
                    this.props.history.push("/404");
                    return;
                }
            }
        }

        if(loaded.posts && loaded.comments){
            match = matchPath(pathname, { path: '/:category/:post_id' });
            if(match){
                const { post_id } = match.params;
                if(post_id && exceptions.indexOf(post_id)===-1 && !posts[post_id] && !comments[post_id]){
                    this.props.history.push("/404");
                    return;
                }
            }

            match = matchPath(pathname, { path: '/:category/:parent_id/:post_id' });
            if(match){
                const { post_id } = match.params;
                if(post_id && !posts[post_id] && !comments[post_id]){
                    this.props.history.push("/404");
                    return;
                }
            }
        }
    }

    render(){
        return(
            <Switch>
                <Route path="/404" component={Error404}/>
                <Route path="/:category/create" component={Create} />
                <Route path="/:category/:parent_id/:post_id" component={Detail} />
                <Route path="/:category/:post_id" component={Detail} />
                <Route path='/:category' component={Main} />
                <Route component={Main} />
            </Switch>
        )
    }
}

function mapStateToProps ({ categories, posts, comments, loaded }) {
    return { categories, posts, comments, loaded };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPosts, fetchCategories }, dispatch);
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))