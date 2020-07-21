import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { formatMoney } from '../tools/tools';

export default class Box extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={()=>this.props.onAddProducto(this.props.product)}>
                <View style={styles.contentImage}>
                    <Image  source={{ uri: this.props.img }}
                        style={styles.image} />
                </View>
                <View style={styles.contentText}>
                    <Text style={{}}>{this.props.name}</Text>
                    <Text style={{}}>{this.props.monedaSimbolo+" "+formatMoney(this.props.precio)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        height: 200,
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 1
    },
    contentImage:{
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    image:{
        width: 120,
        height: 120,
        resizeMode:'contain'
    },
    contentText:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
