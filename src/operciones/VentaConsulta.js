import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker, AsyncStorage, NetInfo } from 'react-native';
import { getCurrentDate } from '../tools/tools';
import IconIoni from 'react-native-vector-icons/Ionicons';

export default class VentaConsulta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            serieNumeracion: '',
            fechaInicial: getCurrentDate(),
            fechaFinal: getCurrentDate(),
            tableHead: ['Fecha Venta', 'Cliente', 'S/N', 'Tipo', 'Total', 'Acción'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd']
            ]
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Consulta de Ventas',
            headerTitleStyle: { fontSize: 14 },
            headerStyle: { backgroundColor: '#1b3c4f' },
            headerTintColor: '#fff',
            headerRight:
                <View style={{ flexDirection: 'row', padding: 5, flex: 1 }}>
                    <TouchableOpacity style={{ paddingHorizontal: 5, borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                        activeOpacity={.5}
                        onPress={
                            () => console.warn('presioname')
                            //() => params.onValidarVenta()
                        }>
                        <IconIoni
                            name="md-refresh"
                            size={20}
                            color="white" />
                        <Text style={{ color: '#fff', fontSize: 12 }}>Recargar</Text>
                    </TouchableOpacity>
                </View>
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput placeholder='Buscar por Serie-Numeracion o Cliente' placeholderTextColor='gray' underlineColorAndroid="transparent"
                            style={styles.inputSearch}
                            onChangeText={(text) => this.setState({ serieNumeracion: text })}
                            value={this.state.serieNumeracion} />
                        <TouchableOpacity activeOpacity={.5}
                            style={styles.btnSearchInput}>
                            <IconIoni name="md-search" size={20} style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxDate}>
                        <DatePicker
                            style={{ flex: 1, marginRight: 20 }}
                            date={this.state.fechaInicial} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2000-01-01"
                            maxDate="2100-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={date => {
                                // let fachaSelect = new Date(date)
                                // let fechaIni = new Date(this.state.fechaInicial)
                                // let fechaFin = new Date(this.state.fechaFinal)
                                // if(fachaSelect <= fechaIni && fechaIni <= fechaFin){
                                // //     console.warn(`la fecha: ${fachaSelect} es mayor a la fecha: ${fechaI}`)
                                // //     this.setState({ fechaInicial: date });
                                // // }else{
                                // //     console.warn(`la fecha: ${fachaSelect} es menor a la fecha: ${fechaI}`)
                                // //     this.setState({ fechaInicial: date });
                                //     this.setState({ fechaInicial: date });
                                // }else{
                                //     console.warn('error de fecha')
                                // }
                                this.setState({ fechaInicial: date });

                            }}
                        />
                        <DatePicker
                            style={{ flex: 1, marginRight: 20 }}
                            date={this.state.fechaFinal} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2000-01-01"
                            maxDate="2100-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={date => {
                                this.setState({ fechaFinal: date });
                            }}
                        />
                        <TouchableOpacity activeOpacity={.5}
                            style={styles.btnSearchDate}>
                            <IconIoni name="md-search" size={20} style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        margin: 5, padding: 10, backgroundColor: '#fff', borderRadius: 5
    },
    inputSearch: {
        height: 42, fontSize: 14, color: 'black', borderColor: '#1b3c4f', borderWidth: 1, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, flex: 1
    },
    btnSearchInput: {
        alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 15, backgroundColor: '#1b3c4f', borderColor: '#1b3c4f', borderWidth: 1, borderTopRightRadius: 5, borderBottomRightRadius: 5
    },
    boxDate: {
        flexDirection: 'row',
        marginTop: 10
    },
    btnSearchDate: {
        alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 15, backgroundColor: '#1b3c4f', borderColor: '#1b3c4f', borderWidth: 1, borderRadius: 5
    }
});