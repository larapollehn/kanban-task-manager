import * as React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board1_done: false,
            board2_done: false,
            board3_done: false,
        }
        this.handleBoardClick = this.handleBoardClick.bind(this);
    }

    handleBoardClick(event){
        let id = event.target.parentElement.id;
        console.log('clicked',id);
    }

    render() {
        return (
            <div id="homeContainer">
                <div className="homeTitles">
                    <h3>Let's Go</h3>
                    <h1>Kanban Online</h1>
                    <h5>Up Your Productivity</h5>
                </div>

                <div className="boardContainer">
                    <div id={"board1"} className={"board1"} onClick={this.handleBoardClick}>
                        <h3>{this.props.board1.name}</h3>
                    </div>
                    <div id={"board2"} className={"board2"} onClick={this.handleBoardClick}>
                        <h3>{this.props.board2.name}</h3>
                    </div>
                    <div id={"board3"} className={"board3"} onClick={this.handleBoardClick}>
                        <h3>{this.props.board3.name}</h3>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default connect(mapStateToProps, {})(Home);
