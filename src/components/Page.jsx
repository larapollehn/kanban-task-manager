import * as React from 'react';

export default class Page extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <button>Nothing will happen!</button>
            </div>
        );
    }
}
