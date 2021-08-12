import React, { useState } from 'react';
import Routes from './app/Routes';
import { ThemeProvider } from './app/context/theme-context';

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<Routes />
		</ThemeProvider>
	);
};

export default App;
