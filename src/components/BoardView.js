import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Issue from "../models/Issue";
import {setBoard1, setBoard2, setBoard3} from "../actions/HomeActions";
import Board from "../models/Board";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import trashCan from "../../public/images/bin.png";

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
            board: state.board,
            dragIssue: []
        }
        this.addIssue = this.addIssue.bind(this);
        this.displayAddIssueForm = this.displayAddIssueForm.bind(this);
        this.dragstartHandler = this.dragstartHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.appendIssueToColumn = this.appendIssueToColumn.bind(this);
        this.removeIssueFromColumn = this.removeIssueFromColumn.bind(this);
        this.saveChangedBoard = this.saveChangedBoard.bind(this);
        this.renameBoard = this.renameBoard.bind(this);
        this.displayRenameForm = this.displayRenameForm.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
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

        this.appendIssueToColumn(category, issueTitle, priority);

        this.displayAddIssueForm();

        document.getElementById("issueTitle").value = '';
    }

    appendIssueToColumn(category, issueTitle, priority) {
        let stateColumns = this.state.columns;
        stateColumns[category]['issues'].push(new Issue(issueTitle, priority, category));
        this.saveChangedBoard(stateColumns);
    }

    removeIssueFromColumn() {
        let category = this.state.dragIssue[0];
        let index = this.state.dragIssue[1];
        let stateColumns = this.state.columns;
        stateColumns[category]['issues'].splice(index, 1);
        this.saveChangedBoard(stateColumns);
    }

    saveChangedBoard(columns, name) {
        let stateBoard = this.state.board;
        if (columns !== false) {
            stateBoard.columns = this.state.columns;
            this.setState({
                columns: columns,
                board: stateBoard
            })
        } else if (name) {
            let stateBoard = this.state.board;
            stateBoard.name = name;
            this.setState({
                board: stateBoard,
                name: name
            })
        }

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
    }

    dragstartHandler(event) {
        let column = event.target.parentElement.parentElement.id;
        let issue = event.target.id;
        let theIssue = this.state.columns[column]['issues'][issue];
        this.setState({
            dragIssue: [column, issue, theIssue]
        })

    }

    dragOverHandler(event) {
        event.preventDefault();
    }

    dropHandler(event) {
        event.preventDefault();
        if (event.target.id === 'trashCan') {
            this.removeIssueFromColumn();
        } else {
            let category;
            if (event.target.nodeName === 'DIV') {
                category = event.target;
            } else {
                throw new Error('Place is not meant to be a drop area');
            }
            this.appendIssueToColumn(category.id, this.state.dragIssue[2].title, this.state.dragIssue[2].priority);
            this.removeIssueFromColumn();
        }
    }

    displayRenameForm() {
        let formVisibility = document.getElementById('renameBoardSection').style.display;
        if (formVisibility === 'none') {
            document.getElementById('renameBoardSection').style.display = 'block';
        } else if (formVisibility === 'block') {
            document.getElementById('renameBoardSection').style.display = 'none';
        } else {
            document.getElementById('renameBoardSection').style.display = 'block';
        }
    }

    renameBoard() {
        let newName = document.getElementById('newBoardName').value;
        this.saveChangedBoard(false, newName);
        this.displayRenameForm();
        document.getElementById('newBoardName').value = '';
    }

    displayDeleteForm() {
        let formVisibility = document.getElementById('deleteBoardSection').style.display;
        if (formVisibility === 'none') {
            document.getElementById('deleteBoardSection').style.display = 'block';
        } else if (formVisibility === 'block') {
            document.getElementById('deleteBoardSection').style.display = 'none';
        } else {
            document.getElementById('deleteBoardSection').style.display = 'block';
        }
    }

    deleteBoard() {
        let boards = JSON.parse(localStorage.getItem('boards'));
        if (this.state.id === 'board1') {
            boards[0] = new Board('untitled', []);
            localStorage.setItem('boards', JSON.stringify(boards));
            this.props.setBoard1(this.state.board);
        } else if (this.state.id === 'board2') {
            boards[1] = new Board('untitled', []);
            localStorage.setItem('boards', JSON.stringify(boards));
            this.props.setBoard2(this.state.board);
        } else if (this.state.id === 'board3') {
            boards[2] = new Board('untitled', []);
            localStorage.setItem('boards', JSON.stringify(boards));
            this.props.setBoard3(this.state.board);
        }
        this.props.history.push({
            pathname: '/',
        })
    }

    render() {
        return (
            <div className={"boardViewContainer"}>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>{this.state.name}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link id={"addIssueBtn"} onClick={this.displayAddIssueForm}>Add Issue</Nav.Link>
                            <NavDropdown title="Menu" id="dropdown-basic-button" alignRight>
                                <NavDropdown.Item id={"renameBtn"}
                                                  onClick={this.displayRenameForm}>Rename</NavDropdown.Item>
                                <NavDropdown.Item id={"deleteBtn"} onClick={this.displayDeleteForm}>Delete
                                    Board</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>


                <Container fluid={true}>
                    <Row>
                        {
                            this.state.columns.map((column, i) =>
                                <Col key={i} id={i} className={"kanbanColumn"} onDrop={this.dropHandler}
                                     onDragOver={this.dragOverHandler}>
                                    <h3 id={"columnName"}>{column['name']}</h3>
                                    <ListGroup id={"columnIssues"} onDrop={this.dropHandler}
                                               onDragOver={this.dragOverHandler}>
                                        {
                                            column['issues'].sort((a, b) => a['priority'] - b['priority'])
                                                .map((issue, i) =>
                                                    <ListGroup.Item key={i} id={i} className={'issue'}
                                                                    draggable={'true'}
                                                                    onDragStart={this.dragstartHandler}>
                                                        {issue['priority'] === 0 ?
                                                            <Badge variant="danger">Urgent</Badge> :
                                                            issue['priority'] === 1 ?
                                                                <Badge variant="warning">High</Badge> :
                                                                issue['priority'] === 2 ?
                                                                    <Badge variant="info">Medium</Badge> :
                                                                    <Badge variant="success">Low</Badge>
                                                        }
                                                        <br/>
                                                        {issue['title']}
                                                    </ListGroup.Item>
                                                )
                                        }
                                    </ListGroup>
                                </Col>
                            )
                        }
                    </Row>
                </Container>

                <img src={trashCan} id={"trashCan"} onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>

                </img>


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

                <div id={"renameBoardSection"} className={"renameBoardSection"}>
                    <h2>Rename Kanban Board</h2>
                    <label>New Board Name</label>
                    <input type={'text'} name={"newBoardName"} id={"newBoardName"} placeholder={'New name...'}/>
                    <button id={"renameBtn"} onClick={this.renameBoard}>Rename</button>
                    <button id={"renameCancelBtn"} onClick={this.displayRenameForm}>Cancel</button>
                </div>

                <div id={"deleteBoardSection"} className={"deleteBoardSection"}>
                    <h2>Are you sure you want to delete the Board. All progress will be lost!</h2>
                    <button id={"deleteBtn"} onClick={this.deleteBoard}>Delete</button>
                    <button id={"renameCancelBtn"} onClick={this.displayDeleteForm}>Cancel</button>
                </div>

            </div>

        )
    }

    componentDidMount() {
        console.log(this.state.columns);
        let radios = document.getElementsByName('radio');
        radios[3].checked = true;
    }
}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps, {setBoard1, setBoard2, setBoard3})(BoardView));
