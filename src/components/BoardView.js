import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

class BoardView extends React.Component{
    constructor(props) {
        super(props);
        let state = this.props.location.state;
        this.state = {
            id: state.id
        }
    }

    render() {
        return(
            <h1>{this.state.id}</h1>
        )
    }

    componentDidMount() {
    }
}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps,{})(BoardView));