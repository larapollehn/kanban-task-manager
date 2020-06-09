import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        let state = this.props.location.state;
        this.state = {
            name: state.board.name,
            columns: state.board.columns
        }

        this.addIssue = this.addIssue.bind(this);
    }

    addIssue(){
        console.log()
    }

    render() {
        return (
            <div className={"boardViewContainer"}>
                <div id={"boardViewNavBar"}>
                    <ul id={"boardViewUl"}>
                        <li className={"boardViewLi"}>{this.state.name}</li>
                        <li className={"boardViewLi"}>Menu</li>
                        <li className={"boardViewLi"} onClick={this.addIssue}>Add</li>
                    </ul>
                </div>

                <div className={"columnsContainer"}>
                    {
                        this.state.columns.map((column, i) =>
                            <div key={i} id={column['name']} className={"kanbanColumn"}>
                                <div id={"columnName"}>{column['name']}</div>
                                <div id={"columnIssues"}>
                                    {
                                        column['issues'].map((issue, i) =>
                                            <div className={'issue'}>
                                                <h3>issue</h3>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>


            </div>

        )
    }

    componentDidMount() {
        console.log(this.state.columns);
    }
}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps, {})(BoardView));
