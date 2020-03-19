import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTitle } from "../actions/pageActions";

class Page extends React.Component{

    constructor(props) {
        super(props);
        this.changeTitle = this.changeTitle.bind(this);
    }

    changeTitle(){
        console.log("changeTitle");
        let newTitle = document.getElementById("title").value;
        console.log(newTitle);
        this.props.setTitle(newTitle);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <input id={"title"} type="text"/>
                <button onClick={this.changeTitle}>Change Title</button>
            </div>
        );
    }
}

Page.propTypes ={
  setTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   title: state.title.title
});

export default connect(mapStateToProps, { setTitle })(Page);