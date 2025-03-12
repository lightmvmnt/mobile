import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'


const TabBardComponent: React.FC<BottomTabBarProps> = ({state, descriptors, navigation}) => {
    
    return (
        <View>
            <Text>TabBardComponent</Text>
        </View>
    )
}

export default TabBardComponent

const styles = StyleSheet.create({})