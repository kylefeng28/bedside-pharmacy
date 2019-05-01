import React from 'react';
import renderer from 'react-test-renderer';

import { ClassList } from '../src/screens/ClassList';
// import { DrugList } from '../src/screens/DrugList';

test('ClassList renders correctly', () => {
	const tree = renderer.create(
    React.createElement(ClassList, null)
	).toJSON();
	expect(tree).toMatchSnapshot();
});
