import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Modal from 'react-modal';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {setBoard1, setBoard2, setBoard3} from "../actions/HomeActions";
import Board from "../models/Board";
import Column from "../models/Column";
import one from "../../public/images/one.jpeg";
import two from "../../public/images/two.jpeg";
import three from "../../public/images/three.jpeg";
import laptop from "../../public/images/laptop.png";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentBoard: '',
            showModal: false,
            screenWidth: window.matchMedia("(min-width: 769px)").matches
        }
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.redirectToBoard = this.redirectToBoard.bind(this);
        this.displayCreateForm = this.displayCreateForm.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    /**
     * if a board is empty user can create it
     * if board was already created redirect user to board
     */
    handleBoardClick(event) {
        let id = event;
        this.setState({
            currentBoard: id
        })
        if (id === 'board1') {
            if (this.props.board1.name === 'untitled') {
                this.handleOpenModal();
            } else {
                this.redirectToBoard(id);
            }
        } else if (id === 'board2') {
            if (this.props.board2.name === 'untitled') {
                this.handleOpenModal();
            } else {
                this.redirectToBoard(id);
            }
        } else if (id === 'board3') {
            if (this.props.board3.name === 'untitled') {
                this.handleOpenModal();
            } else {
                this.redirectToBoard(id);
            }
        }
    }

    /**
     * based on the id, representing the board that was clicked,
     * redirect user to board
     * @param id
     */
    redirectToBoard(id) {
        let board;
        if (id === 'board1') {
            board = this.props.board1;
        } else if (id === 'board2') {
            board = this.props.board2;
        } else if (id === 'board3') {
            board = this.props.board3;
        }
        this.props.history.push({
            pathname: '/boardView',
            state: {
                board: board,
                id: id
            }
        })
    }

    /**
     * if clicked board is empty display the form to create it
     * @param id of board
     * @param display controls if modal is shown or hidden
     */
    displayCreateForm(id, display) {
        let form = document.getElementById('createBoardContainer');
        console.assert(form !== null);
        if (display) {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
        this.setState({
            currentBoard: id
        })
    }

    /**
     * take user input to create a board and save to localstorage
     */
    createBoard() {
        let id = this.state.currentBoard;
        const boardName = document.getElementById("boardName").value;
        const column1 = document.getElementById("column1").value;
        const column2 = document.getElementById("column2").value;
        const column3 = document.getElementById("column3").value;
        const column4 = document.getElementById("column4").value;
        const column5 = document.getElementById("column5").value;
        const column6 = document.getElementById("column6").value;
        const column7 = document.getElementById("column7").value;
        const column8 = document.getElementById("column8").value;
        let columns = [column1, column2, column3, column4, column5, column6, column7, column8];
        columns = columns.filter(el => el !== '').map(column => new Column(column, []))

        if (columns.length < 1 || boardName === '') {
            toast.error("❕ Please complete required fields.");
            this.displayCreateForm();
        } else {
            let boards = JSON.parse(localStorage.getItem('boards'));
            if (id === "board1") {
                this.props.board1.name = boardName;
                this.props.board1.columns = columns;
                boards[0] = new Board(boardName, columns);
            } else if (id === 'board2') {
                this.props.board2.name = boardName;
                this.props.board2.columns = columns;
                boards[1] = new Board(boardName, columns);
            } else if (id === 'board3') {
                this.props.board3.name = boardName;
                this.props.board3.columns = columns;
                boards[2] = new Board(boardName, columns);
            } else {
                throw new Error("Invalid id for board");
            }
            localStorage.setItem('boards', JSON.stringify(boards));
            this.handleCloseModal();
            this.redirectToBoard(id);
        }
    }

    render() {
        if(this.state.screenWidth){
            Modal.setAppElement("#root");
            console.assert(this.props.board1 !== null && this.props.board2 !== null && this.props.board3 !== null);
            return (
                <div id="homeContainer">
                    <div className="homeTitles">
                        <p id={"title"}>Kanban Online</p>
                        <p id={"subTitle"}>Up Your Productivity</p>
                    </div>

                    <div className="boardContainer">
                        <CardDeck>
                            <Card className={"boardCards"} onClick={() => this.handleBoardClick('board1')}>
                                <Card.Img variant="top" src={one}/>
                                <Card.Body>
                                    <Card.Title><h2>{this.props.board1.name}</h2></Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className={"boardCards"} onClick={() => this.handleBoardClick('board2')}>
                                <Card.Img variant="top" src={two}/>
                                <Card.Body>
                                    <Card.Title><h2>{this.props.board2.name}</h2></Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className={"boardCards"} onClick={() => this.handleBoardClick('board3')}>
                                <Card.Img variant="top" src={three}/>
                                <Card.Body>
                                    <Card.Title><h3>{this.props.board3.name}</h3></Card.Title>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </div>

                    <div className={"instructionsSection"}>
                        <Row>
                            <Col>
                                <div className={"instructionIcon"}>1</div>
                                <div className={"instructionsText"}>Create up to three Kanban Boards with up to 8 custom
                                    columns.
                                </div>
                            </Col>
                            <Col>
                                <div className={"instructionIcon"}>2</div>
                                <div className={"instructionsText"}>Create as many issues as you like and assign a level of
                                    urgency.
                                </div>
                            </Col>
                            <Col>
                                <div className={"instructionIcon"}>3</div>
                                <div className={"instructionsText"}>Keep an eye on your progress by moving the issues.</div>
                            </Col>
                            <Col>
                                <div className={"instructionIcon"}>4</div>
                                <div className={"instructionsText"}>Edit the name of the board and columns if needed.</div>
                            </Col>
                        </Row>
                    </div>

                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        style={{content: {backgroundColor: '#1C2B5D', color: "white", padding: "120px"}}}
                    >
                        <Form className={"createBoardForm"} controlid={"createBoardForm"}>
                            <h2 id={"createFormTitle"}>Create your Kanban Board</h2>
                            <br/>
                            <Form.Group controlId={"boardName"}>
                                <Form.Label>Board Name *</Form.Label>
                                <Form.Control placeholder="Board name..."/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="column1">
                                    <Form.Label>Column 1 *</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="column2">
                                    <Form.Label>Column 2</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="column3">
                                    <Form.Label>Column 3</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="column4">
                                    <Form.Label>Column 4</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="column5">
                                    <Form.Label>Column 5</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="column6">
                                    <Form.Label>Column 6</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="column7">
                                    <Form.Label>Column 7</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="column8">
                                    <Form.Label>Column 8</Form.Label>
                                    <Form.Control type="text" placeholder="Column name..."/>
                                </Form.Group>
                            </Form.Row>
                            <Button variant="success" onClick={this.createBoard}>
                                Create Board
                            </Button>{' '}
                            <Button variant="danger" onClick={this.handleCloseModal}>
                                Cancel
                            </Button>
                        </Form>
                        <ToastContainer/>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div id="mobileContainer">
                    <div className="homeTitles">
                        <p id={"title"}>Kanban Online</p>
                        <p id={"subTitle"}>Up Your Productivity</p>
                    </div>
                    <div className={"mobileScreenContainer"}>
                        <img className={"mobileScreen"} src={laptop} alt={"sadFace"}/>
                    </div>
                    <div className={"mobileSubTitle"}>
                        <h2>Available for Laptop and Computer only</h2>
                    </div>
                </div>
            )
        }

    }

    /**
     * get saved boards from localstorage,
     * or put empty default boards in localstorage
     */
    componentDidMount() {
        if (localStorage.getItem('boards') === null) {
            const board1 = new Board('untitled', []);
            const board2 = new Board('untitled', []);
            const board3 = new Board('untitled', []);
            this.props.setBoard1(board1);
            this.props.setBoard2(board2);
            this.props.setBoard3(board3);
            const boards = JSON.stringify([board1, board2, board3]);
            localStorage.setItem('boards', boards);
        } else {
            let boards = JSON.parse(localStorage.getItem('boards'));
            this.props.setBoard1(boards[0]);
            this.props.setBoard2(boards[1]);
            this.props.setBoard3(boards[2]);
        }
        console.assert(localStorage.getItem("boards") !== null);
    }

}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps, {setBoard1, setBoard2, setBoard3})(Home));
