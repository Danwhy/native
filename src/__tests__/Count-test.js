'use strict';

jest.dontMock('../Count.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Count = require('../Count.js');

describe('Count component', () => {

    it('should be a react element', () => {

        var is_element = TestUtils.isElement(
            <Count initVal={1}/>
        );

        expect(is_element).toBe(true);
    });

    it('should shallow render', () => {

        var renderer = TestUtils.createRenderer();

        renderer.render(
            <Count initVal={1}/>
        );

        var output = renderer.getRenderOutput();

        // output.type --> undefined
        expect(output.props.children).toBe(1);
    });
});

