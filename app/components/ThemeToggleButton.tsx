import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ThemeContext, { colors } from '../context/theme-context';

const ThemeToggleButton: React.FC = () => {
    const { dark, toggleTheme } = useContext(ThemeContext);

    return (
        <TouchableOpacity 
            style={[styles.button, { backgroundColor: dark ? colors.light : colors.dark }]} 
            onPress={() => toggleTheme()}
        >
            <Text style={[styles.buttonText, {
                color: dark ? colors.dark : colors.light
            }]}>
                Toggle Theme
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        marginTop: 100
    },
    buttonText: {
        fontSize: 18
    }
})

export default ThemeToggleButton;