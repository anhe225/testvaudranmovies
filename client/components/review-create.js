import React, { Component } from 'react'
import { graphql, compose,withApollo} from "react-apollo";
import createReviewMutation from "../query/createReview";

import readMovieQuery from "../query/readMovie";
import readMoviesQuery from "../query/readMovies";


class ReviewCreate extends Component {

    constructor(props){
        super(props);
        this.state ={ terms : ""};
    }
  render() {
    return (
      <div>
        <div className="row">
        <form className="input-field col s6">
        <input type="text"
            className="validate"
            onChange={e => this.setState({terms : e.target.value})}
            value = {this.state.terms}
            onKeyPress={this.submitForm.bind(this)}
        />
        <label className="active">Ajouter une review</label>
        </form>
        </div>
      </div>
    )
  }

  submitForm(e){
      if(e.key ==="Enter"){
          e.preventDefault();
          this.props.createReviewMutation(
              {
                  variables: {
                      content : this.state.terms,
                      movieId : this.props.movieId
                  }
              }
          ).then( () => {
              this.setState({terms : ""})
          })
      }
  }
}


export default compose(
    withApollo,
    graphql(createReviewMutation,{
        name : "createReviewMutation"
    })
)(ReviewCreate)