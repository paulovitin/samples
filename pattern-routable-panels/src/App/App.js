import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels, Routable, Route} from '@enact/moonstone/Panels';
import React from 'react';
import {SlideLeftArranger} from '@enact/ui/ViewManager';

import AboutPanel from '../views/AboutPanel';
import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const App = kind({
	propTypes: {
		onNavigate: React.PropTypes.func,
		path: React.PropTypes.string
	},

	computed: {
		onFirstPanel: ({onNavigate}) => () => onNavigate({path: '/first'}),
		onSecondPanel: ({onNavigate}) => () => onNavigate({path: '/first/second'}),
		onThirdPanel: ({onNavigate}) => () => onNavigate({path: '/first/third'}),
		onFourthPanel: ({onNavigate}) => () => onNavigate({path: '/first/third/fourth'})
	},

	render: ({onFirstPanel, onFourthPanel, onNavigate, onSecondPanel, onThirdPanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="first" component={AboutPanel} title="About Routable Panels Pattern" onClick={onSecondPanel}>
					<Route path="second" component={MainPanel} title="Second" onClick={onFourthPanel} />
					<Route path="third" component={MainPanel} title="Third" onClick={onFirstPanel}>
						<Route path="fourth" component={MainPanel} title="Fouth" onClick={onThirdPanel} />
					</Route>
				</Route>
			</RoutablePanels>
		)
	}
});

export default MoonstoneDecorator(
	AppStateDecorator(
		App
	)
);