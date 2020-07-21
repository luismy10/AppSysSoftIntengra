import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, AsyncStorage, Alert } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { formatMoney, getDomain, getCurrentDate, getCurrentTime, isNumeric } from '../tools/tools';

export default class VentaProceso extends Component {
    constructor(props) {
        super(props)

        this.state = {
            empleadoId: '',
            // lista productos
            // datos Cliente
            clienteId: '',
            clienteTipoDocumento: '',
            clienteNumeroDocumento: '',
            clienteInformacion: '',
            clienteDireccion: '',
            // datos comprobante
            tipoComprobante: '',
            monedaId: 0,
            fechaVenta: getCurrentDate(),
            horaVenta: getCurrentTime(),

            montoEfectivo: "",
            montoEfectivoNombre: "POR COBRAR:",
            montoCambio: formatMoney(0),

            montoTotal: formatMoney(0),

            montoReferenciaUno: 0,
            montoReferenciaDos: 0,
            montoReferenciaTres: 0,
            listaMontos:[0.10,0.20,0.50,1,2,5,10,20,50,100,200]
        };
    };

    closeModalActual = () => {
        this.props.closeModal();
    }

    componentDidMount() {
        this.setState({
            empleadoId:this.props.empleadoId,
            clienteId: this.props.clienteId,
            clienteTipoDocumento: this.props.clienteTipoDocumento,
            clienteNumeroDocumento: this.props.clienteNumeroDocumento,
            clienteInformacion: this.props.clienteInformacion,
            clienteDireccion: this.props.clienteDireccion,
            tipoComprobante: this.props.tipoComprobante,
            monedaId: this.props.monedaId,
            montoTotal: this.props.total,
            montoCambio: this.props.total,
            montoReferenciaUno:this.props.total,
            montoReferenciaDos:this.props.total,
            montoReferenciaTres:this.props.total
        },()=>{
            for(const value of this.state.listaMontos){
                if(value){

                }
            }
        });
    }

    procesarVenta() {

        if (!isNumeric(this.state.montoEfectivo)) {
            Alert.alert('Punto de venta', 'Ingrese el monto a cobrar!!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { cancelable: true }
            );
            this.setState({ montoEfectivo: '' });
        } else if (this.state.montoEfectivo < this.props.total) {
            Alert.alert('Punto de venta', 'El monto ingresado es menor al total!!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { cancelable: true }
            );
        } else {
            fetch(getDomain() + '/venta/PostProcesarVenta.php', {
                method: 'POST',
                body: JSON.stringify({
                    "empleadoId": this.state.empleadoId,
                    "clienteId": this.state.clienteId,
                    "clienteTipoDocumento": this.state.clienteTipoDocumento,
                    "clienteNumeroDocumento": this.state.clienteNumeroDocumento,
                    "clienteInformacion": this.state.clienteInformacion,
                    "clienteDireccion": this.state.clienteDireccion,
                    "tipoComprobante": this.state.tipoComprobante,
                    "monedaId": this.state.monedaId,
                    "fechaVenta": this.state.fechaVenta,
                    "horaVenta": this.state.horaVenta,
                    "subImporte": this.props.subImporte,
                    "descuento": this.props.descuento,
                    "total": this.props.total,
                    "tipo":"1",
                    "estado":"1",
                    "efectivo":this.state.montoEfectivo,
                    "vuelto":this.state.montoCambio,
                    "tarjeta":0,
                    "listaProductos": this.props.listaProductos
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "No se puedo completar la petición";
                }
            }).then(result => {
                console.warn(result)
            }).catch(error => {
                console.warn("Error cliente:" + error)
            });
        }


    }

    onChangeMontoEfectivo(text) {
        this.setState({ montoEfectivo: text }, () => {
            if (isNumeric(this.state.montoEfectivo)) {
                this.setState({
                    montoCambio: Math.abs(parseFloat(this.props.total) - parseFloat(this.state.montoEfectivo))
                }, () => {
                    if (this.state.montoEfectivo >= this.props.total) {
                        this.setState({ montoEfectivoNombre: "SU VUELTO: " });
                    } else {
                        this.setState({ montoEfectivoNombre: "POR COBRAR: " });
                    }
                });
            } else {
                this.setState({
                    montoCambio: parseFloat(this.props.total),
                    montoEfectivoNombre: "POR COBRAR: "
                });
            }
        });
    }

    onPressMontoReferenciaUno(){
        this.setState({
            montoEfectivo:this.state.montoReferenciaUno
        });
    }

    onPressMontoReferenciaDos(){
        this.setState({
            montoEfectivo:this.state.montoReferenciaDos
        });
    }

    onPressMontoReferenciaTres(){
        this.setState({
            montoEfectivo:this.state.montoReferenciaTres
        });
    }


    render() {
        return (
            <Modal isVisible={this.props.visible} onBackButtonPress={() => this.closeModalActual()} onBackdropPress={() => this.closeModalActual()}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.textNormalSuperMax}>Comprobante </Text>
                        <TouchableOpacity onPress={() => this.closeModalActual()} >
                            <IconIoni
                                name="md-close-circle"
                                size={30}
                                style={{ color: '#1b3c4f' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#1b3c4f' }}></View>


                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center', alignItems: 'center', padding: 10
                            }}>
                                <Text style={styles.textNormalMax}>
                                    TOTAL {this.props.monedaSimbolo + " " + formatMoney(this.state.montoTotal)}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                <View style={{ justifyContent: 'flex-start', marginRight: 5 }}>
                                    <Text style={styles.textNormal}>METODO DE PAGO</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#1b3c4f' }}></View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'flex-end',
                                    marginLeft: 5
                                }}>
                                    <Text style={styles.textNormal}>
                                        {this.state.montoEfectivoNombre}
                                        {this.props.monedaSimbolo + " " + formatMoney(this.state.montoCambio)}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', padding: 10 }}>
                                <View style={[styles.marginBottom]}>
                                    <Text style={styles.textNormal}>EFECTIVO</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.textInputNormal}                                        
                                        onChangeText={(text) => this.onChangeMontoEfectivo(text)}
                                        value={String(this.state.montoEfectivo)}
                                        placeholder='00.00'
                                        placeholderTextColor='gray'
                                        underlineColorAndroid="transparent"
                                        keyboardType="numeric" />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', padding: 10 }}>
                                <View style={[styles.marginBottom]}>
                                    <Text style={styles.textNormal}>OPCIONES RAPIDAS</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flexWrap: 'wrap'
                                }}>
                                    <TouchableOpacity
                                        onPress={()=>this.onPressMontoReferenciaUno()}
                                        style={styles.inputNormal}>
                                        <Text style={styles.textNormal}>
                                            {this.props.monedaSimbolo 
                                            + " " +
                                            formatMoney( this.state.montoReferenciaUno)
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={()=>this.onPressMontoReferenciaDos()}
                                        style={styles.inputNormal}>
                                        <Text style={styles.textNormal}>
                                            {this.props.monedaSimbolo 
                                            + " " + 
                                            formatMoney(this.state.montoReferenciaDos)
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={()=>this.onPressMontoReferenciaTres()}
                                        style={styles.inputNormal}>
                                        <Text style={styles.textNormal}>
                                            {this.props.monedaSimbolo 
                                            + " " +
                                            formatMoney( this.state.montoReferenciaTres)
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={{ height: 1, backgroundColor: '#1b3c4f' }}></View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => this.closeModalActual()}
                            style={[
                                styles.inputNormal, styles.marginRight
                            ]}>
                            <Text style={styles.textNormal}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.inputPrimario}
                            onPress={() => { this.procesarVenta() }}>
                            <Text style={styles.textNormalBasic}>Facturar</Text>
                        </TouchableOpacity>
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
        alignItems: 'center',
        marginBottom: 10
    },
    marginRight: {
        marginRight: 10
    },
    marginBottom: {
        marginBottom: 10
    },
    textNormal: {
        color: '#1b3c4f',
        fontSize: 14
    },
    textNormalBasic: {
        color: 'white',
        fontSize: 14
    },
    textNormalMax: {
        color: '#1b3c4f',
        fontSize: 18
    },
    textNormalSuperMax: {
        color: '#1b3c4f',
        fontSize: 20
    },
    inputNormal: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderColor: '#1b3c4f',
        borderRadius: 5,
        borderWidth: 1
    },
    inputPrimario: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        backgroundColor: '#1b3c4f',
        borderColor: '#1b3c4f',
        borderRadius: 5,
        borderWidth: 1
    },
    textInputNormal: {
        backgroundColor: 'white',
        borderColor: '#1b3c4f',
        borderWidth: 1,
        borderRadius: 5,
        height: 42
    }

})
