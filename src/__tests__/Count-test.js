'use strict';

jest.dontMock('../Count.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Count = require('../Count.js');

describe('This is a test', () => {

    it('should pass', () => {

        console.log('ENV', __DEV__);
        console.log('Component', Count);
        expect(true).toBe(true);
    });
});

