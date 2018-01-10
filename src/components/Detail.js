import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, fetchComment } from '../actions'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'

class Detail extends Component {



    componentDidMount(){
        // who am I
        console.log("Detail ------ componentDidMount", this.props, this.props.history)
        console.log('Detail this.props.match.params ',this.props.match.params )

        const {parentid, id} = this.props.match.params;
        this.props.fetchPost(parentid || id);
    }

    render() {
        //const { previous } = this.props;

        const {category, id} = this.props.match.params;
        let linkTo = `/${category}/post/`;
        if(this.props.match.params.parentId){
            linkTo += this.props.match.params.parentId;
        }

        console.log('category ??????? ', category)


        return (
            <div className="detail">

                    <Link className='close-btn' to={linkTo} >
                    <div className="header-close">
                        <FaAngleLeft size={30} />
                        </div>
                    </Link>

                <div className="main">
                <h1>Detail</h1>

                {/* edit button */}

                {/* form or single comment */}



                Title, Body, Author, timestamp (in user readable format), and vote score
                <form>
                    <input type="text" placeholder="Title" value="" />
                    <input type="text" placeholder="Comment" value=""  />
                    <button type="submit">Submit</button>
                </form>



                </div>
            </div>
        )
    }
}

function mapStateToProps({previous}) {
  return {previous}
}
function mapDispatchToProps (dispatch) {
    return {
        fetchPost: (id) => dispatch(fetchPost()),
        fetchComment: () => dispatch(fetchComment())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
