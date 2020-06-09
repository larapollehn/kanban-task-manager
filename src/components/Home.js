import * as React from 'react';
import {connect} from 'react-redux';
import {setBoard1, setBoard2, setBoard3} from "../actions/HomeActions";
import Board from "../Models/Board";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.redirectToBoard = this.redirectToBoard.bind(this);
        this.displayCreateForm = this.displayCreateForm.bind(this);
    }

    handleBoardClick(event) {
        let id = event.target.id;
        if (id === 'board1'){
            if (this.props.board1.name === 'untitled'){
                this.displayCreateForm(id);
            } else {
                this.redirectToBoard(id);
            }
        } else if (id === 'board2'){
            if (this.props.board2.name === 'untitled'){
                this.displayCreateForm(id);
            } else {
                this.redirectToBoard(id);
            }
        } else if (id === 'board3'){
            if (this.props.board3.name === 'untitled'){
                this.displayCreateForm(id);
            } else {
                this.redirectToBoard(id);
            }
        }
    }

    redirectToBoard(id){
        console.log('redirect to', id);
    }

    displayCreateForm(id){
        let form = document.getElementById('createBoardContainer');
        form.style.display = 'block';
        console.log('create', id);
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
                    <div id={"board1"} className={"board board1"} onClick={this.handleBoardClick}>
                        <h3>{this.props.board1.name}</h3>
                    </div>
                    <div id={"board2"} className={"board board2"} onClick={this.handleBoardClick}>
                        <h3>{this.props.board2.name}</h3>
                    </div>
                    <div id={"board3"} className={"board board3"} onClick={this.handleBoardClick}>
                        <h3>{this.props.board3.name}</h3>
                    </div>
                </div>

                <div id={"createBoardContainer"} className={"createBoardContainer"}>
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
                    <button>Create Board</button>
                </div>
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
            console.log('key DID NOT exist');
        } else {
            let boards = JSON.parse(localStorage.getItem('boards'));
            this.props.setBoard1(boards[0]);
            this.props.setBoard2(boards[1]);
            this.props.setBoard3(boards[2]);
            console.log('key exists');
        }
    }

}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default connect(mapStateToProps, {setBoard1, setBoard2, setBoard3})(Home);
