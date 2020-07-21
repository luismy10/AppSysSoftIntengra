import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList, Picker } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { getDomain } from '../tools/tools';

export default class RealizarCorte extends Component{
    constructor(props){
        super(props)

        this.state={

        }
    }

    // closeModalRealizarCorte(){
    //     this.props.closeModal()
    // }

    render(){
        return(
            <Modal isVisible={this.props.visible} onBackButtonPress={() => this.props.closeModal()} onBackdropPress={() => this.props.closeModal()}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.textTitulo}>Realizar Corte</Text>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.closeModal()}>
                            <IconIoni name="md-close-circle" size={30} style={{ color: '#1b3c4f' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separadorHorizontal}></View>
                    <View style={styles.modalBody}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.funteBasica}>Cerrar Turno</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.funteBasica, {marginRight: 10}}>Cierre de turno:</Text>
                                <Text style={styles.funteBasica}>00/00/0000 00:00 </Text>
                            </View>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.funteBasica, {paddingTop: 10, flex: 1}}>VALOR REAL EN CAJA:</Text>
                            <TextInput
                                placeholder='00.00' placeholderTextColor='gray' underlineColorAndroid="transparent"
                                style={styles.modalInput}
                                />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.funteBasica}>VALOR REAL EN TARJETA:</Text>
                            <Text style={styles.funteBasica}>00.00</Text>
                        </View>

                        <Text style={styles.funteBasica, {marginBottom: 10, paddingVertical: 15}}>Realizar movimiento a las siguientes cuentas:</Text>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.funteBasica, {paddingTop: 10, flex: 1}}>Cuenta efectivo:</Text>
                            <TextInput
                                placeholder='00.00' placeholderTextColor='gray' underlineColorAndroid="transparent"
                                style={styles.modalInput}
                                />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.funteBasica, {paddingTop: 10, flex: 1}}>Cuenta bancaria:</Text>
                            <TextInput
                                placeholder='00.00' placeholderTextColor='gray' underlineColorAndroid="transparent"
                                style={styles.modalInput}
                                />
                        </View>

                    </View>
                    <View style={styles.separadorHorizontal}></View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            activeOpacity={.5}
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1b3c4f', padding: 10, borderRadius: 4}}>
                            <IconIoni name="md-save" size={30} style={{color: '#fff'}} />
                            <Text style={{color:'#fff', paddingLeft: 10}}>Aceptar</Text>
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
    modalBody:{
        padding: 10
    },
    funteBasica:{
        fontSize: 16
    },
    separadorHorizontal:{
        height: 1,
        backgroundColor: '#1b3c4f',
        marginVertical: 10
    },
    modalInput: {
        flex: 1,
        height: 42,
        fontSize: 14,
        color: 'black',
        borderRadius: 4,
        borderColor: '#1b3c4f',
        borderWidth: 1
    }
})