import React, { useState, useLayoutEffect } from 'react';

export const colors = {
	primary: '#FC2E20',
	secondary: '#010100',
	liked: '#ff006a',
	dark: '#121212',
	light: '#eaeaea',
};

const ThemeContext = React.createContext({
	dark: false,
	toggleTheme: () => {},
});

export default ThemeContext;

export const ThemeProvider = (props) => {
	const [dark, setDark] = useState(true);

	// paints the app before it renders elements
	useLayoutEffect(() => {
		const lastTheme = dark;

		if (lastTheme === 'true') {
			setDark(true);
		}

		if (!lastTheme || lastTheme === 'false') {
			setDark(false);
		}
		// if state changes, repaints the app
	}, [dark]);

	const toggleTheme = () => {
		setDark(!dark);
	};

	return (
		<ThemeContext.Provider
			value={{
				dark,
				toggleTheme,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	);
};
