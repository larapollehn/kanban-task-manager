import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setBoard1, setBoard2, setBoard3} from "../actions/HomeActions";
import Board from "../models/Board";
import Column from "../models/Column";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Modal from 'react-modal';

import one from "../../public/images/one.jpeg";
import two from "../../public/images/two.jpeg";
import three from "../../public/images/three.jpeg";

class Home extends React.Component {
    constructor(props) {
        super(props)
        /*
         *
         */
        this.state = {
            currentBoard: 0,
            showModal: false
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
     *
     * @param event
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
     *
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
     *
     * @param id
     * @param display
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

    createBoard() {
        let id = this.state.currentBoard;
        const boardName = document.getElementById("boardName").value;
        /*
         * Hard coded. Not good
         */
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

        //this.displayCreateForm();
        this.handleCloseModal();

        this.redirectToBoard(id);
    }

    render() {
        console.assert(this.props.board1 !== null && this.props.board2 !== null && this.props.board3 !== null);
        return (
            <div id="homeContainer">
                <div className="homeTitles">
                    <p id={"upSubTitle"}>Get Organized</p>
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

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={{content: {backgroundColor: '#DDCCBB'}}}
                >
                    <h3>Create your Kanban Board</h3>
                    <div>
                        <label>Board Name</label>
                        <input type={"text"} name={"boardName"} id={"boardName"} placeholder={"Board name..."}/>
                    </div>
                    <div>
                        <label>Column 1</label>
                        <input type={"text"} name={"column1"} id={"column1"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 2</label>
                        <input type={"text"} name={"column2"} id={"column2"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 3</label>
                        <input type={"text"} name={"column3"} id={"column3"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 4</label>
                        <input type={"text"} name={"column4"} id={"column4"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 5</label>
                        <input type={"text"} name={"column5"} id={"column5"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 6</label>
                        <input type={"text"} name={"column6"} id={"column6"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 7</label>
                        <input type={"text"} name={"column7"} id={"column7"} placeholder={"Column name..."}/>
                    </div>
                    <div>
                        <label>Column 8</label>
                        <input type={"text"} name={"column8"} id={"column8"} placeholder={"Column name..."}/>
                    </div>
                    <button onClick={this.createBoard}>Create Board</button><button onClick={this.handleCloseModal}>Cancel</button>

                </Modal>
            </div>
        )
    }

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
