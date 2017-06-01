import React from 'react';
import ReactDOM from 'react-dom';

import RootContainer from './RootContainer';

ReactDOM.render(<RootContainer />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./RootContainer', () => {
        const NextRootContainer = require('./RootContainer.js').default;
        render(<NextRootContainer />, document.getElementById('react-root'));
    })
}
