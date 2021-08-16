import React, { useState } from 'react';
import Routes from './app/Routes';
import { ThemeProvider } from './app/context/theme-context';
import { ShopContextProvider } from './app/context/shop-context';

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<ShopContextProvider>
				<Routes />
			</ShopContextProvider>
		</ThemeProvider>
	);
};

export default App;
