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
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import trashCan from "../../public/images/bin.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ReactHtmlParser from 'react-html-parser';

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
            dragIssue: [],
            show: false,
            show_delete: false,
            show_add: false,
            show_column: false
        }
        this.addIssue = this.addIssue.bind(this);
        this.dragstartHandler = this.dragstartHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.appendIssueToColumn = this.appendIssueToColumn.bind(this);
        this.removeIssueFromColumn = this.removeIssueFromColumn.bind(this);
        this.saveChangedBoard = this.saveChangedBoard.bind(this);
        this.renameBoard = this.renameBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowDelete = this.handleShowDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleShowColumn = this.handleShowColumn.bind(this);
        this.handleCloseColumn = this.handleCloseColumn.bind(this);
        this.renameColumns = this.renameColumns.bind(this);
    }

    handleShowColumn() {
        this.setState({
            show_column: true
        })
    }

    handleCloseColumn() {
        this.setState({
            show_column: false
        })
    }

    renameColumns() {
        let newColumnNames = [];
        for (let i = 0; i < this.state.columns.length; i++) {
            let column = document.getElementById(`columnRename${i}`).value;
            newColumnNames.push(column);
        }
        let columns = this.state.columns;
        for (let j = 0; j < newColumnNames.length; j++) {
            columns[j]['name'] = newColumnNames[j];
        }
        this.saveChangedBoard(false, false, columns);
        this.handleCloseColumn();
    }

    handleShowAdd() {
        this.setState({
            show_add: true
        })
    }

    handleCloseAdd() {
        this.setState({
            show_add: false
        })
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

        if (issueTitle === '' || priority === undefined) {
            toast.error("❕ Please fill out all fields.");

        } else {
            this.appendIssueToColumn(category, issueTitle, priority);

            this.handleCloseAdd();

            document.getElementById("issueTitle").value = '';
        }

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

    saveChangedBoard(columns, name, newColumns) {
        let stateBoard = this.state.board;
        if (columns !== false) {
            stateBoard.columns = this.state.columns;
            this.setState({
                columns: columns,
                board: stateBoard
            })
        } else if (name !== false) {
            stateBoard.name = name;
            this.setState({
                board: stateBoard,
                name: name
            })
        } else if (newColumns !== false) {
            stateBoard.columns = newColumns;
            this.setState({
                board: stateBoard,
                columns: newColumns
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
        event.persist();
        let column = event.target.parentElement.parentElement.id;
        let issue = event.target.id;
        let theIssue = this.state.columns[column]['issues'][issue];
        console.log(event, column, issue);
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

    handleShow() {
        this.setState({
            show: true
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }


    renameBoard() {
        let newName = document.getElementById('newBoardName').value;
        if (newName === '') {
            toast.error('❕ Choose a new name or cancel.')
        } else {
            this.saveChangedBoard(false, newName, false);
            this.handleClose();
            document.getElementById('newBoardName').value = '';
        }

    }

    handleShowDelete() {
        this.setState({
            show_delete: true
        })
    }

    handleCloseDelete() {
        this.setState({
            show_delete: false
        })
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
                <Navbar  expand="lg">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Kanban Online</Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.state.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link id={"addIssueBtn"} onClick={this.handleShowAdd}>Add Issue</Nav.Link>
                            <NavDropdown title="Menu" id="dropdown-basic-button" alignRight>
                                <NavDropdown.Item className={"dropDownMenu"} id={"renameBtn"}
                                                  onClick={this.handleShow}>Rename Board</NavDropdown.Item>
                                <NavDropdown.Item className={"dropDownMenu"} id={"renameColumnBtn"}
                                                  onClick={this.handleShowColumn}>Rename Columns</NavDropdown.Item>
                                <NavDropdown.Item className={"dropDownMenu"} id={"deleteBtn"} onClick={this.handleShowDelete}>Delete
                                    Board</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

                <div className={"mainBoard"}>
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
                </div>

                <img src={trashCan} id={"trashCan"} onDrop={this.dropHandler} onDragOver={this.dragOverHandler}
                     alt={"trashCan"}/>


                <Modal show={this.state.show_add} onHide={this.handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "#FFE458", margin: "10px", borderRadius: "8px" }}>
                        <Form>
                            <Form.Group controlId={"issueTitle"}>
                                <Form.Label>Issue Title</Form.Label>
                                <Form.Control placeholder="Issue title..."/>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select">
                                    {
                                        this.state.columns.map((column, i) =>
                                            <option key={i} value={i}>{column['name']}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Row} controlId="issuePrioritySection">
                                <Form.Label as="legend" column sm={12}>
                                    Priority Level
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-danger'>Urgent</span>")}
                                        name="radio"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-warning'>High</span>")}
                                        name="radio"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-info'>Medium</span>")}
                                        name="radio"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-success'>Low</span>")}
                                        name="radio"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"renameBtn"} onClick={this.addIssue}>
                            Add
                        </Button>
                        <Button variant="danger" onClick={this.handleCloseAdd}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                    <ToastContainer/>
                </Modal>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename Kanban Board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className={"renameBoardForm"}>
                            <Form.Group controlId={"newBoardName"}>
                                <Form.Label>New Board Name</Form.Label>
                                <Form.Control name={"newBoardName"} type="text"
                                              placeholder="New name..."/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"renameBtn"} onClick={this.renameBoard}>
                            Rename
                        </Button>
                        <Button variant="danger" onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                    <ToastContainer/>
                </Modal>

                <Modal show={this.state.show_delete} onHide={this.handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Kanban Board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the board?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"deleteBtn"} onClick={this.deleteBoard}>
                            Delete
                        </Button>
                        <Button variant="danger" onClick={this.handleCloseDelete}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.show_column} onHide={this.handleCloseColumn}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename Columns</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className={"renameColumnsForm"}>
                            {
                                this.state.columns.map((column, i) =>
                                    <Form.Group key={i} controlId={`columnRename${i}`}>
                                        <Form.Label>Column: {column['name']}</Form.Label>
                                        <Form.Control name={"newColumnsName"} type="text"
                                                      defaultValue={column['name']}/>
                                    </Form.Group>
                                )
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"renameColumnsBtn"} onClick={this.renameColumns}>
                            Rename
                        </Button>
                        <Button variant="danger" onClick={this.handleCloseColumn}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }

    componentDidMount() {
        let boards = JSON.parse(localStorage.getItem('boards'));
        let board;
        if (this.state.id === 'board1') {
            board = boards[0];
        } else if (this.state.id === 'board2') {
            board = boards[1];
        } else if (this.state.id === 'board3') {
            board = boards[2];
        }
        this.setState({
            name: board.name,
            columns: board.columns,
            issues: board.columns.issues,
            priorities: [1, 2, 3, 4],
            board: board,
        })
    }


}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps, {setBoard1, setBoard2, setBoard3})(BoardView));
