import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        let state = this.props.location.state;
        this.state = {
            name: state.board.name,
            columns: state.board.columns,
            priorities: [1,2,3,4],
        }

        this.addIssue = this.addIssue.bind(this);
        this.displayAddIssueForm = this.displayAddIssueForm.bind(this);
    }

    displayAddIssueForm(){
        let visibilityStatus = document.getElementById("createIssueContainer").style.display;
        console.log(visibilityStatus);
        if(visibilityStatus === 'none'){
            document.getElementById("createIssueContainer").style.display = 'block';
        } else if (visibilityStatus === 'block'){
            document.getElementById("createIssueContainer").style.display = 'none';
        } else {
            document.getElementById("createIssueContainer").style.display = 'block';
        }
    }

    addIssue(){
        let issueTitle = document.getElementById("issueTitle").value;
        let category = document.getElementById("category").value;

        let radios = document.getElementsByName("radio");
        let checkedRadio;
        for (let i = 0; i < radios.length; i++){
            if (radios[i].checked){
                checkedRadio = radios[i].value;
            }
        }

        console.log(issueTitle, category, checkedRadio);
    }

    render() {
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
                                    <option key={i} value={column['name']}>{column['name']}</option>
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
        console.log(this.state.columns);
    }
}

const mapStateToProps = state => ({
    board1: state.home.board1,
    board2: state.home.board2,
    board3: state.home.board3
});

export default withRouter(connect(mapStateToProps, {})(BoardView));
