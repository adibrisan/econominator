import React from 'react'
import { Text,TouchableOpacity } from 'react-native'
import styles from './FormButton.style'

export default function FormButton({buttonTitle,...props}) {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...props}>
            <Text style={styles.buttonText}>
                {buttonTitle}
            </Text>
        </TouchableOpacity>
    )
}
