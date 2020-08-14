

import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, TextInput, Button, StatusBar, Image, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import { getDomain } from '../tools/tools';
import ConfigServer from './ConfigServer'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IdEmpleado: '',
            TipoDocumento: '',
            NumeroDocumento: '',
            Apellidos: '',
            Nombres: '',
            Puesto: '',
            Rol: '',
            Estado: '',
            Telefono: '',
            Celular: '',
            Email: '',
            Direccion: '',
            Usuario: '',
            Clave: '',
            Sistema: '',

            // user: '',
            // password: ''
            buttonText: 'Ingresar',
            messageError: '',

            modalConfigServer :false
        }
    }

    static navigationOptions = {
        header: null
    }

    getUsuarioLogin = (Usuario, Clave) => {
        this.setState({ buttonText: 'Validando...' }, () => {
            fetch(getDomain() + '/login/Login.php?Usuario=' + Usuario + '&Clave=' + Clave, {
                method: 'GET'
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "No se puedo completar la petición";
                }
            }).then(result => {

                if (result.estado == 1) {
                    let empleado = result.empleado;
                    this.setState({
                        buttonText: 'Ingresar',
                        messageError: '',
                        IdEmpleado: empleado.IdEmpleado,
                        TipoDocumento: empleado.TipoDocumento,
                        NumeroDocumento: empleado.NumeroDocumento,
                        Apellidos: empleado.Apellidos,
                        Nombres: empleado.Nombres,
                        Puesto: empleado.Puesto,
                        Rol: empleado.Rol,
                        Usuario: empleado.Usuario,
                        Clave: empleado.Clave,
                        Sistema: empleado.Sistema
                    }, () => {
                        this._loadAsync();
                    })
                } else {

                    this.setState({
                        buttonText: 'Ingresar',
                        messageError: result.message,
                        Usuario: '', Clave: ''
                    })
                    this.refs.txtUsuario.focus();

                }
            }).catch(err => {

                this.setState({ buttonText: 'Ingresar', messageError: err })
            });

        });

    }

    _loadAsync = async () => {
        await AsyncStorage.setItem('userToken', JSON.stringify({
            "IdEmpleado": this.state.IdEmpleado,
            "Apellidos": this.state.Apellidos,
            "Nombres": this.state.Nombres,
            "Puesto": this.state.Puesto,
            "Rol": this.state.Rol
        }));
        const navigateAction = NavigationActions.navigate({
            routeName: 'App',
            params: { Usuario: this.state.Nombres + ' ' + this.state.Apellidos },
            key: 'keyprincipal',
            action: NavigationActions.navigate({ routeName: 'App' }),
        });
        this.props.navigation.dispatch(navigateAction);
    }


    onLogin() {

        if (this.state.Usuario.length == 0) {
            Alert.alert('Advertencia', 'Ingrese su usuario',
                [
                    {
                        text: 'Ok',
                        onPress: () => {

                        }
                    }, null, null
                ]
            );
            this.refs.txtUsuario.focus();
        } else if (this.state.Clave.length == 0) {
            Alert.alert('Advertencia', 'Ingrese su contraseña',
                [
                    {
                        text: 'Ok',
                        onPress: () => {

                        }
                    }, null, null
                ]
            );
            this.refs.txtClave.focus();
        } else {

            this.getUsuarioLogin(this.state.Usuario, this.state.Clave);

            // await AsyncStorage.setItem('userToken', 'abc');
            // const navigateAction = NavigationActions.navigate({
            //     routeName: 'App',
            //     params: { Usuario: 'Luis Alexander' },
            //     key: 'keyprincipal',
            //     action: NavigationActions.navigate({ routeName: 'App' }),
            // });
            // this.props.navigation.dispatch(navigateAction);

        }

    }

    onCloseModalConfigServer = ()=>{
        this.setState({
            modalConfigServer: false
        })
    }

    onOpenModalConfigServer = ()=>{
        this.setState({
            modalConfigServer: true
        })
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor='#1b3c4f' barStyle="light-content" />
                <View style={styles.container}>
                    <View style={styles.containerForm}>
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                            <TouchableOpacity 
                                activeOpacity = {.5}
                                onPress = { ()=>this.onOpenModalConfigServer() }
                                style = {{alignItems: 'center', borderWidth: 1, borderColor: '#000', borderRadius: 5, padding: 5 }}
                                >
                                <MaterialCommunityIcons
                                    name="server-network"
                                    size={18}
                                    color='#151a23'
                                />
                                <Text style={{ color: '#151a23', fontSize: 16, marginTop: 5 }}>
                                    Configurar Dominio
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <Image source={require('../img/logo.png')} style={{ width: 83, height: 79 }} resizeMode='contain' />
                            <Text style={{ color: '#151a23', fontSize: 16, marginTop: 10 }}>
                                Sys Soft
                            </Text>
                        </View>

                        <View style={{ display: 'flex', alignItems: "center", marginVertical: 15 }}>
                            <Text style={{ color: '#151a23', fontSize: 16 }}>
                                Digite los datos de ingreso al sistema
                            </Text>
                        </View>

                        <View style={styles.textInputStyle}>
                            <View style={{
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon
                                    name="user"
                                    size={18}
                                    color='#151a23'
                                />
                            </View>

                            <TextInput
                                placeholderTextColor='#999999'
                                underlineColorAndroid="transparent"
                                placeholder="Usuario"
                                style={{ flex: 1, fontSize: 14, color: '#151a23' }}
                                onChangeText={(text) => this.setState({ Usuario: text })}
                                value={this.state.Usuario}
                                ref='txtUsuario'
                            />
                        </View>

                        <View style={styles.textInputStyle}>
                            <View style={{
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon
                                    name="unlock-alt"
                                    size={18}
                                    color='#151a23'
                                />
                            </View>
                            <TextInput
                                placeholderTextColor='#999999'
                                underlineColorAndroid="transparent"
                                placeholder="Contraseña"
                                style={{ flex: 1, fontSize: 14, color: '#151a23' }}
                                onChangeText={(text) => this.setState({ Clave: text })}
                                value={this.state.Clave}
                                ref='txtClave'
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={{ marginVertical: 20 }}>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: '#2796c4', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.onLogin()}>
                                <Text style={{ color: '#fff' }}>{this.state.buttonText}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text>{this.state.messageError}</Text>
                        </View>

                    </View>
                </View>
                {
                    this.state.modalConfigServer?
                        <ConfigServer
                            visible={this.state.modalConfigServer}
                            onCloseModalConfigServer={ ()=>this.onCloseModalConfigServer()}
                        />
                        : null
                        
                }
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    containerForm: {
        width: '90%',
        marginVertical: 20,
        padding: 10,
    },
    textInputStyle: {
        flexDirection: 'row',
        borderColor: '#151a23',
        borderBottomWidth: 1,
        marginVertical: 15,
        marginHorizontal: 10
    }
});

