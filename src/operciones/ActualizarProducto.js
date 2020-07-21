import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import Modal from 'react-native-modal';
import { formatMoney, isNumeric, getDomain} from '../tools/tools';

export default class ActualizarProducto extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idSuministro: '',
            precio: 0,
            cantidad: 0,
            totalProducto: 0,
            stateRequest: true,
            listaPrecios: []
        };

    };

    componentDidMount() {   
        this.setState({
            idSuministro: this.props.producto.IdSuministro,
            precio: formatMoney(this.props.producto.PrecioVentaGeneral),
            cantidad: formatMoney(this.props.producto.Cantidad),
            totalProducto: formatMoney(this.props.producto.PrecioVentaGeneral * this.props.producto.Cantidad)
        }, ()=>this.getListaPrecios(this.state.idSuministro) )
    }

    getListaPrecios = (idSuministro) => {
        this.setState({ stateRequest: true }, () => {
            fetch(getDomain() + '/venta/GetPreciosSuministro.php?idSuministro='+idSuministro, {
                method: 'GET'
            }).then(response => {           
                if (response.ok) {
                    return response.json();
                } else {
                    throw "No se puedo completar la petición";
                }
            }).then(response => {
                let result = response;
                if (result.estado == 1) {
                    this.setState({ stateRequest: false, listaPrecios: result.precios });
                } else {
                    this.setState({ stateRequest: false });
                }
            }).catch(error => {
                this.setState({ stateRequest: false });
            });
        });
    }

    calcularPrecioTotales(text) {
        let currentPrecio = !isNumeric(text) ? 0 : text;
        let total = this.state.cantidad * currentPrecio;
        this.setState({ precio: text, totalProducto: total });
    }

    calcularCantidadTotales(text) {
        let currentCantidad = !isNumeric(text) ? 0 : text;
        let total = this.state.precio * currentCantidad;
        this.setState({ cantidad: text, totalProducto: total });
    }

    calcularTotales() {
        if (!isNumeric(this.state.precio)) {
            this.setState({ precio: 0 });
        } else if (!isNumeric(this.state.cantidad)) {
            this.setState({ cantidad: 0 });
        } else {
            this.props.closeModal();

            let newProducto = this.props.producto;
            newProducto.Cantidad = this.state.cantidad;
            newProducto.PrecioVentaGeneral = this.state.precio;

            newProducto.SubImporte = newProducto.PrecioVentaGeneral * newProducto.Cantidad;
            newProducto.Descuento = newProducto.Descuento*newProducto.Cantidad ;
            newProducto.SubTotal = newProducto.SubImporte-newProducto.Descuento;
            newProducto.Total = newProducto.SubTotal;

            this.props.updateProducto(newProducto,this.props.index);

        }
    }

    updateNewPrice = (item)=>{
        this.props.closeModal();

        let newProducto = this.props.producto;
            newProducto.Cantidad = item.Factor;
            newProducto.PrecioVentaGeneral = item.Valor;

            newProducto.SubImporte = newProducto.PrecioVentaGeneral * newProducto.Cantidad;
            newProducto.Descuento = newProducto.Descuento*newProducto.Cantidad ;
            newProducto.SubTotal = newProducto.SubImporte-newProducto.Descuento;
            newProducto.Total = newProducto.SubTotal;
            
            this.props.updateProducto(newProducto,this.props.index);
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} onBackButtonPress={() => this.props.closeModal()} onBackdropPress={() => this.props.closeModal()}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 16, color: '#1b3c4f' }}>{this.props.producto.NombreMarca}</Text>
                        <TouchableOpacity onPress={() => this.props.closeModal()} >
                            <IconIoni name="md-close-circle" size={30} style={{ color: '#1b3c4f' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <View style={styles.modalBoxInput}>
                            <Text>Precio:</Text>
                            <TextInput placeholder='Precio' placeholderTextColor='gray' underlineColorAndroid="transparent" keyboardType="numeric"
                                value={this.state.precio}
                                onChangeText={(text) => this.calcularPrecioTotales(text)}
                                style={styles.modalInput}
                            />
                        </View>
                        <View style={styles.modalBoxInput}>
                            <Text>Cantidad:</Text>
                            <TextInput placeholder='Cantida' placeholderTextColor='gray' underlineColorAndroid="transparent" keyboardType="numeric"
                                value={this.state.cantidad}
                                onChangeText={(text) => this.calcularCantidadTotales(text)}
                                style={styles.modalInput}
                            />
                        </View>
                    </View>
                    <View style={styles.modalSubBody}>
                        <View style={styles.modalSubBoxInput}>
                            <Text>Lista de Precios</Text>
                            <View style={{ flex: 1, borderColor: '#ccc', borderWidth: 1 }}>
                                <FlatList
                                     keyExtractor={(index) => index.toString()}
                                    style={styles.boxScrollView}
                                    data={this.state.listaPrecios}
                                    renderItem={({ item, index }) =>
                                        <TouchableOpacity key={index} 
                                            style={styles.boxListView}  
                                            onPress={() => this.updateNewPrice(item) }>
                                            <Text>{index + 1}</Text>
                                            <Text>{item.Nombre}</Text>
                                            <Text>{formatMoney(item.Valor)}</Text>
                                            <Text>{formatMoney(item.Factor)}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>


                        </View>
                        <View style={styles.modalSubBoxInput}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total por producto</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.monedaSimbolo + ' ' + formatMoney(this.state.totalProducto)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => this.calcularTotales()}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#1b3c4f',
                                        paddingVertical: 8,
                                        paddingHorizontal: 20,
                                        color: '#fff',
                                        backgroundColor: '#1b3c4f'
                                    }}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.closeModal()}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#1b3c4f',
                                        paddingVertical: 8,
                                        paddingHorizontal: 20,
                                        color: '#1b3c4f',
                                        backgroundColor: '#fff'
                                    }}>Cancelar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 2.5,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    modalBoxInput: {
        flex: 1,
        padding: 5
    },
    modalInput: {
        height: 42,
        fontSize: 14,
        color: 'black',
        borderRadius: 4,
        borderColor: '#1b3c4f',
        borderWidth: 1
    },
    modalSubBody: {
        flex: 1,
        flexDirection: 'row',
    },
    modalSubBoxInput: {
        flex: 1,
        padding: 5
    },
    boxScrollView: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#ececec',
    },
    boxListView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        margin: 2
    }
})
