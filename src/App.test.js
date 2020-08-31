import React from 'react';
import App from './App';
import renderer from 'react-test-renderer'

describe('App snapshot', () => {
    it('should render snapshot', () => {
        const component = renderer.create(<App/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
