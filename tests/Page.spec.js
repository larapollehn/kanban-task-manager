import React from 'react';
import renderer from 'react-test-renderer';

import Page from "../src/components/Page";

describe('Page', () =>{
    test('Page snapshot renders', () => {
        const tree = renderer
            .create(<Page title={"Hi Long!"}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});