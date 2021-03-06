import React, { useRef } from 'react'
import { Animated, StyleSheet, View, Platform, FlatList } from 'react-native'

function HeaderAnimated(props) {

    const moveCalc = useRef(new Animated.Value(0)).current

    const irHeightView = props.navBar ? props.navBar : 79
    const orHeightView = props.height ? props.height : 150

    let heightView = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [orHeightView, irHeightView],
        extrapolate: 'clamp'
    });

    let heightImage = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [50, props.imageSize ? props.imageSize : 35],
        extrapolate: 'clamp'
    });

    let marginLeftImage = moveCalc.interpolate({
        inputRange: [0, orHeightView],
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
                        <Animated.Image source={props.image} style={[styles.image, { height: heightImage, marginLeft: marginLeftImage, marginTop: Platform.OS === 'ios' ? 24 : 0 }]} />
                    }
                    {
                        props.rightItem &&
                        <Animated.View style={[styles.iconview, { opacity: opacityIcon, }]}>
                            {props.rightItem}
                        </Animated.View>
                    }
                </Animated.View>

                <FlatList
                    {...props}

                    onScroll={
                        Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: moveCalc
                                        }
                                    }
                                }
                            ], { useNativeDriver: false }
                        )
                    }
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
