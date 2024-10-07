import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomModalProvider, useBottomModal } from 'react-native-bottom-modal'

const BottomModal = () => {
    const { showModal } = useBottomModal()
    return (
        <View>
            <Button
                title='Hello'
                onPress={() =>
                    showModal({
                        header: <Text>"Hello  World"</Text>,
                        content: (
                            <Text>"Body"</Text>
                        ),
                    })
                }
            />
            {/* With handle */}
            {/* </Button> */}
        </View>
    )
}

export default BottomModal

const styles = StyleSheet.create({})