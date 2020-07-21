import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker, AsyncStorage, NetInfo } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import RealizarCorte from './RealizarCorte'

export default class CorteCaja extends Component{
    constructor(props) {
        super(props);
        this.state={
            modalRealizarCorte: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Corte de Caja',
            headerTitleStyle: { fontSize: 16 },
            headerStyle: { backgroundColor: '#1b3c4f' },
            headerTintColor: '#fff',
            headerRight:
                <View style={{ flexDirection: 'row', padding: 5, flex: 1 }}>
                    <TouchableOpacity style={{ paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}
                        activeOpacity={.5}
                        onPress={() => console.warn(params)}>
                        <Entypo
                            name="dots-three-vertical"
                            size={20}
                            color="white" />
                        {/* <Text style={{ color: '#fff', fontSize: 12 }}>Option</Text> */}
                    </TouchableOpacity>
                </View>
        }
    }

    openModalRealizarCorte = ()=>{
        this.setState({
            modalRealizarCorte: true
        })
    }

    closeModalRealizarCorte = ()=>{
        this.setState({
            modalRealizarCorte: false
        })
    }

    render(){
        return(
            <View style={style.container}>
                <View style={style.containerArea}>
                    <View style={style.row}>
                        <TouchableOpacity style={style.Button} activeOpacity={.5} onPress={ ()=>this.openModalRealizarCorte() }>
                            <FontAwesome
                                name='scissors'
                                size={18}
                                color='#fff'/>
                            <Text style={{ color:'#fff' }}>Realizar Corte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.Button}>
                            <FontAwesome
                                name='save'
                                size={18}
                                color='#fff'/>
                            <Text style={{ color:'#fff' }}>Terminar Turno y Cerrar Caja</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={style.textSubTitulo}>Inicio de turno:</Text>
                            <Text>00/00/0000 00:00</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={style.textSubTitulo}>Base:</Text>
                            <Text>M 00.00</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={style.textSubTitulo}>Ventas:</Text>
                            <Text>M 00.00</Text>
                        </View>
                    </View>
                    <View style={style.separadorHorizontal}></View>
                    <View style={style.row}>
                        <FontAwesome
                            name='fax'
                            size={20}
                            color='#1b3c4f'/>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>Dinero recibido:</Text>
                    </View>
                    <View style={style.rowDetalle}>
                        <View style={style.rowIcono}>
                            <FontAwesome
                                name='arrow-circle-o-right'
                                size={20}
                                color='#1b3c4f'/>
                            <Text style={style.sangria}>Base</Text>
                        </View>
                        <Text>M 00.00</Text>
                    </View>
                    <View style={style.rowDetalle}>
                        <View style={style.rowIcono}>
                            <FontAwesome
                                name='arrow-circle-o-right'
                                size={20}
                                color='#1b3c4f'/>
                            <Text style={style.sangria}>Ventas en efectivo</Text>
                        </View>
                        <Text>M 00.00</Text>
                    </View>
                    <View style={style.rowDetalle}>
                        <View style={style.rowIcono}>
                            <FontAwesome
                                name='arrow-circle-o-right'
                                size={20}
                                color='#1b3c4f'/>
                            <Text style={style.sangria}>Ventas con tarjeta</Text>
                        </View>
                        <Text>M 00.00</Text>
                    </View>
                    <View style={style.rowDetalle}>
                        <View style={style.rowIcono}>
                            <FontAwesome
                                name='arrow-circle-o-right'
                                size={20}
                                color='#1b3c4f'/>
                            <Text style={style.sangria}>Ingreso de Efectivo</Text>
                        </View>
                        <Text>M 00.00</Text>
                    </View>
                    <View style={style.rowDetalle}>
                        <View style={style.rowIcono}>
                            <FontAwesome
                                name='arrow-circle-o-right'
                                size={20}
                                color='#1b3c4f'/>
                            <Text style={style.sangria}>Salidas de Efectivo</Text>
                        </View>
                        <Text>M 00.00</Text>
                    </View> 
                    <View style={style.separadorHorizontal}></View>
                    <View style={style.rowDetalle}>
                        <View style={style.rowIcono}>
                            <FontAwesome
                                name='money'
                                size={20}
                                color='#1b3c4f'/>
                            <Text style={style.sangria}>Total</Text>
                        </View>
                        <Text>M 00.00</Text>
                    </View>
                </View>
                {
                    this.state.modalRealizarCorte?
                        <RealizarCorte
                            visible={this.state.modalRealizarCorte}
                            closeModal={this.closeModalRealizarCorte}/>
                        :null
                }
                
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{
        padding: 5,
        backgroundColor: '#ccc' 
    },
    containerArea:{
        backgroundColor: '#fff',
        padding: 10
    },
    row:{
        flexDirection: 'row',
        padding: 10
    },
    Button:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#1b3c4f',
        paddingVertical: 10,
        marginHorizontal: 3,
        borderRadius: 4
    },
    separadorHorizontal:{
        height: 1,
        backgroundColor: '#1b3c4f',
        marginHorizontal: 10
    },
    textSubTitulo:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    rowDetalle:{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    rowIcono:{
        flexDirection: 'row',
    },
    sangria:{
        paddingLeft: 10
    }
})

