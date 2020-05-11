import React, { useRef } from 'react'
import { Animated, StyleSheet, View, StatusBar, Platform, FlatList } from 'react-native'

function HeaderAnimated(props) {

    const moveCalc = useRef(new Animated.Value(0)).current

    let heightView = moveCalc.interpolate({
        inputRange: [0, 79],
        outputRange: [props.height ? props.height : 150, props.navBar ? props.navBar : 79],        
        extrapolate: 'clamp'
    });

    let heightImage = moveCalc.interpolate({
        inputRange: [0, 50],
        outputRange: [50, 25],
        extrapolate: 'clamp'
    });

    let marginLeftImage = moveCalc.interpolate({
        inputRange: [0, 50],
        outputRange: [0, props.marginImage ? (props.marginImage * -1) : -280],
        extrapolate: 'clamp'
    });

    let opacityIcon = moveCalc.interpolate({
        inputRange: [20, 50],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    return (
        <>            
            <View style={{ flex: 1 }}>

                <Animated.View style={[styles.header, { backgroundColor: props.color ? props.color : '#333', height: heightView }]}>
                    {
                        props.image &&
                        <Animated.Image source={props.image} style={[styles.image, { height: heightImage, marginLeft: marginLeftImage, marginTop: Platform.OS === 'ios' ? 24 : 20 }]} />
                    }
                    {
                        props.icon &&
                        <Animated.View style={[styles.iconview, { opacity: opacityIcon, }]}>
                            {props.icon}
                        </Animated.View>
                    }
                </Animated.View>

                <FlatList
                    {...props}

                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: moveCalc
                                }
                            }
                        }
                    ])}
                    style={{ flex: 1 }}
                    scrollEventThrottle={1}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        resizeMode: 'contain'
    },
    iconview: {
        position: 'absolute',
        right: 4,
        top: 38
    }
})

export default HeaderAnimated
