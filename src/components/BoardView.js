import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Issue from "../models/Issue";
import {setBoard1, setBoard2, setBoard3} from "../actions/HomeActions";

/**
 *
 */
class BoardView extends React.Component {
    constructor(props) {
        super(props);
        let state = this.props.location.state;

        /*
         *
         */
        this.state = {
            id: state.id,
            name: state.board.name,
            columns: state.board.columns,
            issues: state.board.columns.issues,
            priorities: [1, 2, 3, 4],
            board: state.board
        }
        this.addIssue = this.addIssue.bind(this);
        this.displayAddIssueForm = this.displayAddIssueForm.bind(this);
    }

    /**
     *
     */
    displayAddIssueForm() {
        let visibilityStatus = document.getElementById("createIssueContainer").style.display;
        if (visibilityStatus === 'none') {
            document.getElementById("createIssueContainer").style.display = 'block';
        } else if (visibilityStatus === 'block') {
            document.getElementById("createIssueContainer").style.display = 'none';
        } else {
            document.getElementById("createIssueContainer").style.display = 'block';
        }
    }

    /**
     *
     */
    addIssue() {
        let issueTitle = document.getElementById("issueTitle").value;
        let category = document.getElementById("category").value;

        let radios = document.getElementsByName("radio");
        let priority;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                priority = i;
                break;
            }
        }
        console.assert(priority !== null, "Priority must not be null");
        console.assert(typeof priority === "number", "Priority should be a number");

        let stateColumns = this.state.columns;
        stateColumns[category]['issues'].push(new Issue(issueTitle, priority, category));

        let stateBoard = this.state.board;
        stateBoard.columns = this.state.columns;
        this.setState({
            columns: stateColumns,
            board: stateBoard
        })
        console.assert(localStorage.getItem("boards") !== null);
        let boards = JSON.parse(localStorage.getItem('boards'));

        console.assert(boards.length === 3);
        if (this.state.id === 'board1') {
            boards[0] = this.state.board;
            localStorage.setItem('boards', JSON.stringify(boards));
            this.props.setBoard1(this.state.board);
        } else if (this.state.id === 'board2') {
            boards[1] = this.state.board;
            localStorage.setItem('boards', JSON.stringify(boards));
            this.props.setBoard2(this.state.board);

        } else if (this.state.id === 'board3') {
            boards[2] = this.state.board;
            localStorage.setItem('boards', JSON.stringify(boards));
            this.props.setBoard3(this.state.board);
        }
        this.displayAddIssueForm();
    }

    render() {
        console.log(this.state.columns);

        return (
            <div className={"boardViewContainer"}>
                <div id={"boardViewNavBar"}>
                    <ul id={"boardViewUl"}>
                        <li className={"boardViewLi"}>{this.state.name}</li>
                        <li className={"boardViewLi"}>Menu</li>
                        <li id={"addIssueBtn"} className={"boardViewLi"} onClick={this.displayAddIssueForm}>Add</li>
                    </ul>
                </div>

                <div className={"columnsContainer"}>
                    {
                        this.state.columns.map((column, i) =>
                            <div key={i} id={column['name']} className={"kanbanColumn"}>
                                <h3 id={"columnName"}>{column['name']}</h3>
                                <ul id={"columnIssues"}>
                                    {
                                        column['issues'].sort((a, b) => a['priority'] - b['priority'])
                                                        .map((issue, i) =>
                                            <li key={i} className={'issue'}>{issue['title']}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>


                <div id={"createIssueContainer"} className={"createIssueContainer"}>
                    <h3>Create a new Issue</h3>
                    <div>
                        <label>Issue title</label>
                        <input type={"text"} name={"issueTitle"} id={"issueTitle"} placeholder={"Issue title..."}/>
                    </div>
                    <div>
                        <label>Category</label>
                        <select id="category" name="category">
                            {
                                this.state.columns.map((column, i) =>
                                    <option key={i} value={i}>{column['name']}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        {
                            this.state.priorities.map((level, i) =>
                                <label key={i} className="priorityRadioBtn">{level}
                                    <input type="radio" name="radio" value={level}/>
                                </label>
                            )
                        }
                    </div>
                    <button onClick={this.addIssue}>Add Issue</button>
                </div>

            </div>

        )
    }

    componentDidMount() {
        console.log(this.state.columns[0].issues);
    }
}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps, {setBoard1, setBoard2, setBoard3})(BoardView));
