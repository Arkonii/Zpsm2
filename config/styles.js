import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#c8ffb0'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    container2: {
        flex: 1,
        backgroundColor: '#c8ffb0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSpacer: {
        marginVertical: 10,
    },
    author: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    content: {
        flex: 1,
        fontSize: 16,
    },
    timestamp: {
        marginLeft: 10,
        color: '#888',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    priceText: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%', // Szerokość pola tekstowego
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlign: 'center',
    },

});

export default styles;