//import React, { Component } from 'react';
import React from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StyleSheet, StatusBar, TextInput, Alert, Switch, ToastAndroid, Picker } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';

class DatosGenerales extends React.Component {
    constructor(props) {
        super(props);
    }

    //Estado inicial falso para el interruptor. Puedes cambiarlo a true solo para ver.
    state = { switchValue: false };

    toggleSwitch = value => {
        //onValueChange del interruptor se llamará esta función
        this.setState({ switchValue: value });
        //Cambios de estado de acuerdo con el interruptor
    };

    tipo_Venta = [
        { label: 'Por Unidad/Pza', value: 'Unidad' },
        { label: 'A granel(Peso)', value: 'Granel' }
    ];

    render() {
        return (
            <View style={[style.container, { backgroundColor: 'transparent' }]}>
                <ScrollView>
                    <View style={style.boxFather}>
                        <View style={style.boxSon}>
                            <Text style={style.boxText}>Clave *</Text>
                            <View style={style.boxRows}>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="clave" ref='txtClave' maxLength={25}></TextInput>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={style.btnCodeBar} activeOpacity={.5} onPress={() =>
                                        Alert.alert('Advertencia', 'Opcion habilitada proximamente',
                                            [
                                                { text: 'Ok', onPress: () => { } }, null, null
                                            ]
                                        )}>
                                        <IconIoni name="md-barcode" size={28} style={style.iconGeneric} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.btnCodeBar} activeOpacity={.5} onPress={() =>
                                        Alert.alert('Advertencia', 'No se detecto la camara',
                                            [
                                                { text: 'Ok', onPress: () => { } }, null, null
                                            ]
                                        )}>
                                        <IconIoni name="md-qr-scanner" size={28} style={style.iconGeneric} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <Text style={style.boxText}>Clave Alterna</Text>
                            <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="clave alterna" ref='txtClaveAlterna' maxLength={25}></TextInput>
                        </View>
                        <View style={style.boxSon}>
                            <Text style={style.boxText}>Descripcion *</Text>
                            <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="descripcion" ref='txtDescripcion'></TextInput>
                        </View>
                        <View style={style.boxSon}>
                            <Text style={style.boxText}>Marca</Text>
                            <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="marca" ref='txtMarca' maxLength={25}></TextInput>
                        </View>
                        <View style={style.boxSon}>
                            <Text style={style.boxText}>Unidad de Medida</Text>
                            <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="unidad de medida" ref='txtUnidadMedida' maxLength={25}></TextInput>
                        </View>
                        <View style={style.boxSon}>
                            <View style={[style.boxRows, { paddingVertical: 10 }]}>
                                <Text style={style.boxText}>Inventario:</Text>
                                <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />
                            </View>
                        </View>

                        <View style={style.boxSon}>
                            <View style={[style.boxRows, { paddingVertical: 10 }]}>
                                <Text style={style.boxText}>Venta del Producto:</Text>
                                <RadioForm
                                    style={{ paddingRight: 10, }}
                                    radio_props={this.tipo_Venta}
                                    buttonColor={'grey'}
                                    labelColor={'grey'}
                                    selectedButtonColor={'#26A69A'}
                                    selectedLabelColor={'#26A69A'}
                                    buttonSize={12}
                                    onPress={(label) => { ToastAndroid.show('Venta por ' + label.toString(), ToastAndroid.SHORT) }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class DatosPrecio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: null,
            valor: '-seleccione-'
        };
        
        buttonsListArr = [];
        for (let i = 0; i <= 25; i++) {
            buttonsListArr.push(
                <TouchableOpacity activeOpacity={.5} key={i} style={style.boxListView} onPress={()=>{
                    this.state.valor='Impuesto: '+i;
                    this.setState({ visibleModal: null });
                }}>
                    <Text>{i} Impuesto</Text>
                    <Text>Valor</Text>                         
                </TouchableOpacity>
            );
        }       
    }

  
   /*
    <Picker style={{ width: 140, color: '#26A69A' }}
                                    selectedValue={this.state.pickerLabel}
                                    onValueChange={
                                        (itemValue, itemIndex) => 
                                        {
                                            this.setState({
                                            pickerLabel: itemValue, 
                                            pickerIndex: itemIndex});
                                            console.warn(itemIndex+' '+itemValue);

                                            
                                        }
                                    }>
                                    <Picker.Item label="Ninguno(%)" value="1" />
                                    <Picker.Item label="I.G.V.(18%)" value="2" />
                                    <Picker.Item label="Exonerada(%)" value="3" />
                                    <Picker.Item label="I.S.C.(10%)" value="4" />
                                </Picker>
   */

    _renderButtonImpuesto = (valores, onPress) => (
        <TouchableOpacity onPress={onPress} style={{flex:1}}>
            <View style={{flexDirection:'row', borderColor:'#1b3c4f', borderWidth:1, borderRadius:5, marginRight: 5, marginBottom: 5}}>
                <Text style={{fontSize:14, color:'#1b3c4f', paddingTop:6.5, paddingLeft:5, paddingRight:15}}>{this.state.valor}</Text>
                <View style={{ padding: 5, backgroundColor: '#1b3c4f'}}>
                    <IconIoni name="md-arrow-dropdown" size={24} style={{ color: '#fff' }} />
                </View>
            </View>           
        </TouchableOpacity>   
    );

    _renderButtonClose = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <IconIoni name="md-close-circle" size={30} style={{color:'#1b3c4f'}} />
        </TouchableOpacity>
    );

    _renderModalContentImpuesto = () => (
        <View style={style.modalContent}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontSize:16, color:'#1b3c4f'}}>Impuesto</Text>                             
                {this._renderButtonClose('X', () => this.setState({ visibleModal: null }))}
            </View>
            <View style={{
                flexDirection: 'row',
                borderColor: '#1b3c4f',
                backgroundColor: 'white',
                borderWidth: 1,
                borderTopRightRadius:4, 
                borderTopLeftRadius:4,
                marginVertical: 10,
                justifyContent:'center',
                alignItems:'center'
                }}>
                <IconIoni name="md-search" size={18} style={{paddingLeft:5}}/>
                <TextInput placeholder='Buscar' placeholderTextColor='gray' underlineColorAndroid="transparent" onChangeText={this.props.handleSearch}
                    style={{
                        flex: 1,
                        height: 42,
                        fontSize: 14,
                        color: 'black',
                        borderRadius: 4
                    }}/>
            </View> 
            <ScrollView style={{backgroundColor:'#ececec'}}>
                {buttonsListArr}             
            </ScrollView>
               
        </View>
    );

    render() {
        return (

            <View style={style.container}>
                <ScrollView>
                    <View style={style.boxFather}>
                        <View style={style.boxSubTitle}>
                            <Text style={style.textSubTitle}>Datos de Almacen</Text>
                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Inventario Mínimo</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0" ref='txtInventarioMin' maxLength={7} keyboardType='numeric'></TextInput>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Inventario Máximo</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0" ref='txtInventarioMax' maxLength={7} keyboardType='numeric'></TextInput>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Cantidad Actual</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtCantidad' maxLength={7} keyboardType='numeric'></TextInput>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Precio Compra</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtPrecioCompra' maxLength={7} keyboardType='numeric'></TextInput>
                            </View>
                        </View>

                        <View style={style.boxSon}>
                            <View style={[style.boxRows]}>
                                <Text style={[style.boxText,{paddingTop:7}]}>Impuesto:</Text>
                                <View>            
                                    {this._renderButtonImpuesto('valores', () => this.setState({ visibleModal: 1 }))}
                                    <Modal isVisible={this.state.visibleModal === 1}>
                                        {this._renderModalContentImpuesto()}
                                    </Modal>
                                </View>
                            </View>
                        </View>

                        <View style={[style.boxSubTitle, { marginTop: 10 }]}>
                            <Text style={style.textSubTitle}>Lista de Precios</Text>
                        </View>

                        <View style={style.boxSon}>
                            <View style={style.boxRows}>
                                <View>
                                    <Text style={style.boxText}>Precio Venta 1</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtPrecioVenta1' maxLength={7} keyboardType='numeric'></TextInput>
                                </View>
                                <View>
                                    <Text style={style.boxText}>Margen 1 %</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtMargen1' maxLength={7} keyboardType='numeric'></TextInput>
                                </View>
                                <View>
                                    <Text style={style.boxText}>Utilidad 1</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtUtilidad1' editable={false} selectTextOnFocus={false}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View style={style.boxRows}>
                                <View>
                                    <Text style={style.boxText}>Precio Venta 2</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtPrecioVenta2' maxLength={7} keyboardType='numeric'></TextInput>
                                </View>
                                <View>
                                    <Text style={style.boxText}>Margen 2 %</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtMargen2' maxLength={7} keyboardType='numeric'></TextInput>
                                </View>
                                <View>
                                    <Text style={style.boxText}>Utilidad 2</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtUtilidad2' editable={false} selectTextOnFocus={false}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View style={style.boxRows}>
                                <View>
                                    <Text style={style.boxText}>Precio Venta 3</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtPrecioVenta3' maxLength={7} keyboardType='numeric'></TextInput>
                                </View>
                                <View>
                                    <Text style={style.boxText}>Margen 3 %</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtMargen3' maxLength={7} keyboardType='numeric'></TextInput>
                                </View>
                                <View>
                                    <Text style={style.boxText}>Utilidad 3</Text>
                                    <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="0.00" ref='txtUtilidad3' editable={false} selectTextOnFocus={false}></TextInput>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

class OtrasCaracteristicas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            visibleModalEstado: null,
            valor: '-seleccione-'
        };
        buttonsListArr = [];
        for (let i = 1; i <= 2; i++) {
            buttonsListArr.push(
                <TouchableOpacity activeOpacity={.5} key={i} style={style.boxListView} onPress={()=>{
                    this.state.valor='Estado: '+i;
                    this.setState({ visibleModalEstado: null });
                }}>
                    <Text>{i} Estado</Text>
                    <Text>Valor</Text>                         
                </TouchableOpacity>
            );
        }
    }

    _renderButtonEstado = (valores, onPress) => (
        <TouchableOpacity onPress={onPress} style={{flex:1}}>
            <View style={{flexDirection:'row', borderColor:'#1b3c4f', borderWidth:1, borderRadius:5, marginRight: 5, marginBottom: 5}}>
                <Text style={{fontSize:14, color:'#1b3c4f', paddingTop:6.5, paddingLeft:5, paddingRight:15}}>{this.state.valor}</Text>
                <View style={{ padding: 5, backgroundColor: '#1b3c4f'}}>
                    <IconIoni name="md-arrow-dropdown" size={24} style={{ color: '#fff' }} />
                </View>
            </View>           
        </TouchableOpacity>   
    );

    _renderButtonClose = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <IconIoni name="md-close-circle" size={30} style={{color:'#1b3c4f'}} />
        </TouchableOpacity>
    );

    _renderModalContentEstado = () => (
        <View style={style.modalContent}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontSize:16, color:'#1b3c4f'}}>Estado</Text>                             
                {this._renderButtonClose('X', () => this.setState({ visibleModalEstado: null }))}
            </View>
            <View style={{
                flexDirection: 'row',
                borderColor: '#1b3c4f',
                backgroundColor: 'white',
                borderWidth: 1,
                borderTopRightRadius:4, 
                borderTopLeftRadius:4,
                marginVertical: 10,
                justifyContent:'center',
                alignItems:'center'
                }}>
                <IconIoni name="md-search" size={18} style={{paddingLeft:5}}/>
                <TextInput placeholder='Buscar' placeholderTextColor='gray' underlineColorAndroid="transparent" onChangeText={this.props.handleSearch}
                    style={{
                        flex: 1,
                        height: 42,
                        fontSize: 14,
                        color: 'black',
                        borderRadius: 4
                    }}/>
            </View> 
            <ScrollView style={{backgroundColor:'#ececec'}}>
                {buttonsListArr}             
            </ScrollView>
               
        </View>
    );
    
    

    toggleSwitch = value => {
        this.setState({ switchValue: value });
    };

    render() {
        return (
            <View style={[style.container, { backgroundColor: 'transparent' }]}>
                <ScrollView>
                    <View style={style.boxFather}>
                        <View style={[style.boxSon, { paddingRight: 10, paddingBottom: 5, alignItems: 'center', justifyContent: 'center' }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={[style.boxConfigImg, { width: 140, borderColor: '#1b3c4f', borderWidth: 1, borderRadius: 5 }]}>
                                    <Image source={require('../../img/logo.png')} style={{ width: 130, height: 120 }} />
                                </View>
                                <View style={[style.boxConfigImg, { padding: 10 }]}>
                                    <TouchableOpacity style={[style.btnGeneric, { marginBottom: 1, paddingHorizontal: 10 }]} activeOpacity={.5} onPress={() =>
                                        Alert.alert('Advertencia', 'Opcion habilitada proximamente',
                                            [
                                                { text: 'Ok', onPress: () => { } }, null, null
                                            ]
                                        )}>
                                        <IconIoni name="md-images" size={30} style={style.iconGeneric} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[style.btnGeneric, { marginTop: 1, paddingHorizontal: 14 }]} activeOpacity={.5} onPress={() =>
                                        Alert.alert('Advertencia', 'Opcion habilitada proximamente',
                                            [
                                                { text: 'Ok', onPress: () => { } }, null, null
                                            ]
                                        )}>
                                        <IconIoni name="md-trash" size={30} style={style.iconGeneric} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Descripcion Alterna</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="descripcion alterna" ref='txtDescripcionAlterna' maxLength={4}></TextInput>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View style={style.boxRows}>
                                <Text style={[style.boxText, { paddingVertical: 7 }]}>Estado:</Text>
                                {/*}
                                <Picker style={{ width: 110, color: '#26A69A' }}
                                    selectedValue={estado.estadoProducto}
                                    onValueChange={(est) => this.setState({ estadoProducto: est })}>
                                    <Picker.Item label="Activo" value="Activo" />
                                    <Picker.Item label="Inactivo" value="Inactivo" />
                                </Picker>
                                */}
                                <View>            
                                    {this._renderButtonEstado('valores', () => this.setState({ visibleModalEstado: 1 }))}
                                    <Modal isVisible={this.state.visibleModalEstado === 1}>
                                        {this._renderModalContentEstado()}
                                    </Modal>
                                </View>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Categoria</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="categoria" ref='txtCategoria'></TextInput>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View>
                                <Text style={style.boxText}>Presentacion</Text>
                                <TextInput placeholderTextColor='#999999' underlineColorAndroid="transparent" placeholder="presentacion" ref='txtPresentacion'></TextInput>
                            </View>
                        </View>
                        <View style={style.boxSon}>
                            <View style={[style.boxRows, { paddingVertical: 10 }]}>
                                <Text style={style.boxText}>Lote:</Text>
                                <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const tabAddArticulos = createBottomTabNavigator({
    DatosGenerales: {
        screen: DatosGenerales,
        navigationOptions: {
            tabBarLabel: 'Generales',
            tabBarIcon: ({ tintColor }) => (
                <IconIoni name="md-albums" size={24} color={tintColor} />
            )
        }

    },
    DatosPrecio: {
        screen: DatosPrecio,
        navigationOptions: {
            tabBarLabel: 'Precios',
            tabBarIcon: ({ tintColor }) => (
                <IconIoni name="md-cash" size={24} color={tintColor} />
            )
        }
    },
    OtrasCaracteristicas: {
        screen: OtrasCaracteristicas,
        navigationOptions: {
            tabBarLabel: 'Otros',
            tabBarIcon: ({ tintColor }) => (
                <IconIoni name="md-book" size={24} color={tintColor} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: '#1b3c4f',
            inactiveTintColor: 'grey'
        }
    });

export default tabAddArticulos;

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ececec'
    },
    boxFather: {
        marginHorizontal: 10, marginVertical: 10
    },
    boxSon: {
        margin: 1.5, paddingLeft: 10, paddingTop: 5, backgroundColor: '#fff'
    },
    boxRows: {
        flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10,
    },
    btnCodeBar: {
        height: 40, width: 50, backgroundColor: '#1b3c4f', marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 4
    },
    iconGeneric: {
        color: '#fff'
    },
    boxText: {
        color: '#1b3c4f',
    },
    boxSubTitle: {
        marginBottom: 1.5, paddingLeft: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: '#1b3c4f', borderRadius: 1
    },
    textSubTitle: {
        color: '#fff', fontSize: 16
    },
    boxConfigImg: {
        height: 130, alignItems: 'center', justifyContent: 'center'
    },
    btnGeneric: {
        backgroundColor: '#1b3c4f', paddingVertical: 5, borderRadius: 4
    },

    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    
    boxListView: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        margin: 2
    }

});
