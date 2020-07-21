import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatMoney } from '../tools/tools';
import ActualizarProducto from './ActualizarProducto';

export default class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            producto: {},
            index: 0,
            monedaSimbolo: "",
            modalActualizarProducto: false,
        }
    }

    openModalProducto = (item, index, monedaSimbolo) => {
        this.setState({
            producto: item,
            index: index,
            modalActualizarProducto: true,
            monedaSimbolo: monedaSimbolo
        })
    }

    closeModalActualizarProducto = () => {
        this.setState({ modalActualizarProducto: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    width='100%'
                    keyExtractor={(index) => index.toString()}
                    style={styles.boxScrollView}
                    data={this.props.listVenta}
                    renderItem={({ item, index }) =>
                        <View style={styles.boxListView}>

                            <View style={styles.boxListViewContent}>

                                <View style={styles.boxTextPrimary}>
                                    <Text style={{ fontSize: 11 }}>
                                        {item.NombreMarca}
                                    </Text>
                                </View>

                                <View style={styles.boxListViewSubContent}>
                                    <TouchableOpacity style={styles.buttonMoreLess}
                                        onPress={() => this.props.onLessProducto(item, index)}>
                                        <FontAwesome
                                            name="minus"
                                            size={22}
                                            color="#1b3c4f" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 60,
                                            height: 30,
                                            backgroundColor: '#1b3c4f'
                                        }}
                                        activeOpacity={.5}
                                        onPress={() => this.openModalProducto(item, index, this.props.monedaSimbolo)}>
                                        <Text style={{ fontSize: 12, color: '#fff' }}>
                                            {formatMoney(item.Cantidad)}
                                        </Text>
                                    </TouchableOpacity>
                                    {/* </View> */}
                                    <TouchableOpacity style={styles.buttonMoreLess}
                                        onPress={() => this.props.onMoreProducto(item, index)}>
                                        <FontAwesome
                                            name="plus"
                                            size={22}
                                            color="#1b3c4f" />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={styles.boxListViewContent}>

                                <View style={styles.boxTextPrimary}>
                                    <Text style={{ fontSize: 12 }}>
                                        {this.props.monedaSimbolo + ' ' + formatMoney(item.PrecioVentaGeneral)}
                                    </Text>
                                </View>

                                <View style={styles.boxListViewSubContent}>
                                    <Text style={{ paddingRight: 10, fontSize: 12 }}>
                                        {this.props.monedaSimbolo + ' ' + formatMoney(item.Total)}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.buttonRemove}
                                        onPress={() => this.props.onRemovedProducto(item)}>
                                        <IconIoni
                                            name="md-trash"
                                            size={22}
                                            color="#1b3c4f" />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    }
                />
                {
                    this.state.modalActualizarProducto ?
                        <ActualizarProducto
                            producto={this.state.producto}
                            index={this.state.index}
                            monedaSimbolo={this.state.monedaSimbolo}
                            visible={this.state.modalActualizarProducto}
                            closeModal={this.closeModalActualizarProducto}
                            updateProducto={this.props.updateProducto}
                        />
                        : null
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxScrollView: {
        // paddingHorizontal: 2,
        // paddingVertical: 2,
        backgroundColor: '#fff'
    },
    boxListView: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        margin: 0
    },
    boxListViewContent: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5
    },
    boxListViewSubContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    boxTextPrimary: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    buttonMoreLess: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRemove: {
        width: 40,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#1b3c4f',
        // borderWidth: 1
    }
});