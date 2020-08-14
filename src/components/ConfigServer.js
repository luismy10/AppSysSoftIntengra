import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList, Picker, AsyncStorage, Alert } from 'react-native';
import Modal from 'react-native-modal';
import IconIoni from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getDomain, getHttp, getFolderBackEnd } from '../tools/tools';

export default class ConfigServer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ConfigDomain: '',
        }
    }

    componentDidMount() {
        this._getValueConfigDomain();
    }

    _getValueConfigDomain = async () => {
        if (await AsyncStorage.getItem('configServerToken')) {
            this.setState({
                ConfigDomain: await AsyncStorage.getItem('configServerToken')
            })
        }
    }

    _setConfigServer = async () => {
        if (this.state.ConfigDomain != '') {
            await AsyncStorage.setItem('configServerToken', this.state.ConfigDomain.trim())
            const value = await AsyncStorage.getItem('configServerToken');
            if (value != null) {
                Alert.alert('Mensaje', 'Se guardo correctamente su dominio: ' + this.state.ConfigDomain)
            }
        } else {
            Alert.alert('Mensaje', 'Ingrese un dominio por favor')
        }
        console.warn(getFolderBackEnd())

    }

    _getTestConexion = () => {

        if (this.state.ConfigDomain != '') {
            fetch(getHttp() + this.state.ConfigDomain + getFolderBackEnd() + '/database/TestDomain.php', {
                method: 'GET'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw 'No se puedo completar la petición'
                }
            }).then(result => {
                if (result.estado == 1){
                    Alert.alert('Mensaje', result.mensaje)
                }
            }).catch(err => {
                Alert.alert('Mensaje', err)
            })
        } else {
            Alert.alert('Mensaje', 'Dijite un dominio valido')
        }

    }

    render() {
        return (
            <Modal isVisible={this.props.visible} onBackButtonPress={() => this.props.onCloseModalConfigServer()} onBackdropPress={() => this.props.onCloseModalConfigServer()}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.textTitulo}>Configure su dominio</Text>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.onCloseModalConfigServer()}>
                            <IconIoni name="md-close-circle" size={30} style={{ color: '#1b3c4f' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInputStyle}>
                        <View style={{
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <FontAwesome
                                name="server"
                                size={18}
                                color='#151a23'
                            />
                        </View>
                        <TextInput
                            placeholderTextColor='#999999'
                            underlineColorAndroid="transparent"
                            placeholder="192.168.1.X:80"
                            style={{ flex: 1, fontSize: 14, color: '#151a23' }}
                            onChangeText={(text) => this.setState({ ConfigDomain: text })}
                            value={this.state.ConfigDomain}
                        />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: '#2796c4', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                            onPress={() => this._setConfigServer()}>
                            <Text style={{ color: '#fff' }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={() => this._getTestConexion()}>
                        <Text style={{ textDecorationLine: 'underline', color: '#2796c4' }}>Probar Conexión</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
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

    textInputStyle: {
        flexDirection: 'row',
        borderColor: '#151a23',
        borderBottomWidth: 1,
        marginVertical: 15,
        marginHorizontal: 10
    }
})
