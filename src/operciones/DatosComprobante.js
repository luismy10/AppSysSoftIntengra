import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList, Picker } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { getDomain } from '../tools/tools';

export default class DatosComprobante extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaDocumento: [],

            idCliente:'',
            tipoDocumento:'',
            numeroDocumento:'',
            cliente:'',
            direccion:''
        };
        this.staticCliente={}
    };

    componentDidMount() {
        this.getTipoDocumento();
    }

    getTipoDocumento() {
        fetch(getDomain() + '/venta/GetTipoDocumento.php?idTipoDocumento=0003', {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw "No se puedo completar la petición";
            }
        }).then(result => {
            if(result.estado == 1){
                this.setState({listaDocumento:result.tipoDocumento},()=>{

                    for(let i = 0; i < this.state.listaDocumento.length;i++){
                        if(this.state.listaDocumento[i].IdDetalle == this.props.clienteTipoDocumento){                        
                            this.setState({tipoDocumento:this.state.listaDocumento[i].IdDetalle});
                            break;
                        }

                    }
                    this.setState({
                        idCliente:this.props.clienteId,
                        tipoDocumento: this.props.clienteTipoDocumento,
                        numeroDocumento:this.props.clienteNumeroDocumento,
                        cliente:this.props.clienteInformacion,
                        direccion:this.props.clienteDireccion
                    }, ()=>this.dataStaticCliente() );
                });
            }else{
                this.setState({listaDocumento:[]});
            }
        }).catch(error => {

        });
    }

    closeModalDatosComprobante = () => {
        this.props.closeModal();
    }

    documentList = () => {
        return (this.state.listaDocumento.map((item, i) => {
            return (<Picker.Item key={i} label={item.Nombre} value={item.IdDetalle} />)
        }));
    }

    GetSearchClienteNumeroDocumento(){
        fetch(getDomain() + '/venta/GetSearchClienteNumeroDocumento.php?opcion=2&search=' + this.state.numeroDocumento, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw "No se puedo completar la petición";
            }
        }).then(result => {
            
            if (result.estado == 1) {
                
                this.setState({
                    idCliente:result.cliente.IdCliente,
                    tipoDocumento: result.cliente.TipoDocumento,
                    cliente:result.cliente.Informacion,
                    direccion:result.cliente.Direccion
                },()=>{
                    for(let i = 0; i < this.state.listaDocumento.length;i++){
                        if(this.state.listaDocumento[i].IdDetalle == result.cliente.TipoDocumento){                        
                            this.setState({tipoDocumento:this.state.listaDocumento[i].IdDetalle});
                            break;
                        }
                    }
                });

            } else {
                this.setState({
                    idCliente:result.cliente.IdCliente,
                    tipoDocumento:result.cliente.TipoDocumento,
                    cliente:result.cliente.Informacion,
                    direccion:result.cliente.Direccion
                });
            }
        }).catch(error => {

        });
    }

    onAceptar = ()=> {        
        if( ((this.staticCliente.tipoDocumento != this.state.tipoDocumento) || (this.staticCliente.numeroDocumento != this.state.numeroDocumento)) && (this.staticCliente.idCliente === this.state.idCliente) ){          
            this.props.onSetCliente({
                clienteId:'',
                clienteTipoDocumento: this.state.tipoDocumento,
                clienteInformacion: this.state.cliente,
                clienteNumeroDocumento: this.state.numeroDocumento,
                clienteDireccion: this.state.direccion,
            });
        } else if( this.staticCliente.idCliente != this.state.idCliente){
            this.props.onSetCliente({
                clienteId: this.state.idCliente,
                clienteTipoDocumento: this.state.tipoDocumento,
                clienteInformacion: this.state.cliente,
                clienteNumeroDocumento: this.state.numeroDocumento,
                clienteDireccion: this.state.direccion,
            });
        } else{
            this.props.onSetCliente({
                clienteId: this.state.idCliente,
                clienteTipoDocumento: this.state.tipoDocumento,
                clienteInformacion: this.state.cliente,
                clienteNumeroDocumento: this.state.numeroDocumento,
                clienteDireccion: this.state.direccion,
            });
          
        }
        this.closeModalDatosComprobante();
    }

    dataStaticCliente = ()=> {
        this.staticCliente={
            idCliente: this.state.idCliente,
            tipoDocumento: this.state.tipoDocumento,
            numeroDocumento: this.state.numeroDocumento,
            cliente: this.state.cliente,
            direccion: this.state.direccion
        }
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} onBackButtonPress={() => this.closeModalDatosComprobante()} onBackdropPress={() => this.closeModalDatosComprobante()}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.textTitulo}>Datos del Cliente</Text>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.closeModalDatosComprobante()}>
                            <IconIoni name="md-close-circle" size={30} style={{ color: '#1b3c4f' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separadorHorizontal}></View>
                    <View style={styles.modalBody}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={styles.modalBoxInput}>
                                <Text>Tipo de Documento:</Text>
                                <Picker
                                    selectedValue={this.state.tipoDocumento}
                                    onValueChange={(value) => (this.setState({ tipoDocumento: value }))}>
                                    {this.documentList()}
                                </Picker>
                            </View>
                            <View style={styles.modalBoxInput}>
                                <Text>N° de Documento:</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput placeholder='00000000000' placeholderTextColor='gray' underlineColorAndroid="transparent" keyboardType="numeric"
                                        style={{ height: 42, fontSize: 14, color: 'black', borderTopLeftRadius: 2.5, borderBottomLeftRadius: 2.5, borderColor: '#1b3c4f', borderWidth: 1, flex: 1 }} 
                                        onChangeText={(text)=>this.setState({numeroDocumento:text})}
                                        value={this.state.numeroDocumento}/>
                                    <TouchableOpacity activeOpacity={.5} style={{ alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, borderTopRightRadius: 2.5, borderBottomRightRadius: 2.5, backgroundColor: '#1b3c4f' }}
                                        onPress={()=>this.GetSearchClienteNumeroDocumento()}>
                                        <IconIoni name="md-search" size={20} style={{ color: '#fff' }}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={styles.modalBoxInput}>
                                <Text>Cliente:</Text>
                                <TextInput placeholder='Nombre del Cliente' placeholderTextColor='gray' underlineColorAndroid="transparent"
                                    style={styles.modalInput}
                                    onChangeText={(text)=>this.setState({cliente:text})}
                                    value={this.state.cliente}
                                />
                            </View>
                            <View style={styles.modalBoxInput}>
                                <Text>Dirección:</Text>
                                <TextInput placeholder='Dirección del Cliente' placeholderTextColor='gray' underlineColorAndroid="transparent"
                                    style={styles.modalInput}
                                    onChangeText={(text)=>this.setState({direccion:text})}
                                    value={this.state.direccion}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 15, justifyContent: 'space-around', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={.5}
                            onPress={ ()=> this.onAceptar() }>
                            <Text style={{ padding: 10, color: '#fff', backgroundColor: '#1b3c4f', borderRadius: 2.5 }}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
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
    textTitulo: {
        fontSize: 20,
        color: '#1b3c4f'
    },
    separadorHorizontal: {
        height: 1,
        backgroundColor: '#1b3c4f',
        marginTop: 10
    },
    modalBody: {
        //flex: 1,
        //flexDirection: 'column',
        //paddingTop: 15,
        justifyContent: 'space-between',
        paddingTop: 15,
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
    }
})
