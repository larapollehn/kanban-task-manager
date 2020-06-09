import * as React from 'react';

export default class CreateBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"createBoardContainer"}>
                <h3>Create your Kanban Board</h3>
                <label>Board Name</label>
                <input type={"text"} name={"boardName"} id={"boardName"} placeholder={"Board name..."}/>

                <label>Column 1</label>
                <input type={"text"} name={"column1"} id={"column1"} placeholder={"Column name..."}/>

                <label>Column 2</label>
                <input type={"text"} name={"column2"} id={"column2"} placeholder={"Column name..."}/>

                <label>Column 3</label>
                <input type={"text"} name={"column3"} id={"column3"} placeholder={"Column name..."}/>

                <label>Column 4</label>
                <input type={"text"} name={"column4"} id={"column4"} placeholder={"Column name..."}/>

                <label>Column 5</label>
                <input type={"text"} name={"column5"} id={"column5"} placeholder={"Column name..."}/>

                <label>Column 6</label>
                <input type={"text"} name={"column6"} id={"column6"} placeholder={"Column name..."}/>

                <label>Column 7</label>
                <input type={"text"} name={"column7"} id={"column7"} placeholder={"Column name..."}/>

                <button>Create Board</button>
            </div>
        )
    }
}