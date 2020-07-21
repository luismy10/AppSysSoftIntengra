import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker, AsyncStorage, NetInfo } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GridView from 'react-native-super-grid';
import { formatMoney, getDomain } from '../tools/tools';
import Modal from 'react-native-modal';
import Box from './Box';
import ListItem from './ListItem';
import VentaProceso from './VentaProceso';
import DatosComprobante from './DatosComprobante';

export default class Venta extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aperturaCaja: 'none',
            usuarioId: '',

            modalTitleMessage: '',
            modalSubTitleMessage: '',
            modalButtomTitleMessage: '',

            listVenta: [],
            items: [],

            subImporte: 0.00,
            descuento: 0.00,
            subTotal: 0.00,
            total: 0.00,

            stateRequest: true,
            stateMenssage: 'Cargando productos...',
            error: false,

            connected: true,
            server: true,
            validate: true,

            modalVentaProceso: false,
            modalDatosComprobante: false,
            modalConexion: false,

            search: '',

            selectComprobante: null,

            //moneda datos
            monedaId: 0,
            monedaSimbolo: 'M',
            //cliente datos
            clienteId: '',
            clienteTipoDocumento: 0,
            clienteInformacion: '',
            clienteNumeroDocumento: '',
            clienteDireccion: '',
            //lista de comprobantes datos
            listComprobantes: [],
            //lista de impuestos datos
            listaImpuestos: [],
            //serie y numeracion
            serie: '',
            numeracion: '',
        };

        this.addListVenta = [];


    };

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                const empledo = JSON.parse(value);
                this.setState({ usuarioId: empledo.IdEmpleado }, () => {
                    this.getValidarCreacionCaja(this.state.usuarioId);
                });
            }
        } catch (error) {
            console.warn("Error en: " + error)
        }
    }

    componentDidMount() {
        /* this.props.navigation.setParams({
             openModalVentaProceso: this.openModalVentaProceso,
             onValidarVenta: this.onValidarVenta,
             onNuevaVenta: this.onNuevaVenta
         });
 
         this.handleConnectivityChange();*/
        this._retrieveData();
    }

    handleConnectivityChange = () => {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                this.setState({ connected: true }, () => {
                    this.getAllDatos();
                });

            } else {
                this.setState({ connected: false });
            }
        });
    }

    getAllDatos = () => {
        this.getListSuministros(1, '');
        this.getLoadDataBase();
    }

    comprobanteList = () => {
        return (this.state.listComprobantes.map((item, i) => {
            return (<Picker.Item key={i} label={item.Nombre} value={item.IdTipoDocumento} />)
        }));
    }

    onValueChangeComprobantes = (value) => {
        this.setState({ selectComprobante: value }, () => {
            this.getTipoComprobante(value);
        });
    }

    onChangeTextSearch(text) {
        this.getListSuministros(1, text)
    }

    getValidarCreacionCaja(idUsuario) {
        
        fetch(getDomain() + '/venta/GetValidarCreacionCaja.php?idUsuario=' + idUsuario, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw "No se puedo completar la petición";
            }
        }).then(result => {
            if (result.estado == 1) {
               
                if (result.caja.id == '1') {

                } else if (result.caja.id == '2') {
                    this.setState({ aperturaCaja: 'auto' });
                } else if (result.caja.id == '3') {
                    let date = new Date();
                    let time = Date.parse(result.caja.hora);
                    console.warn(date.getDate());
                    this.setState({
                        validate: false,
                        modalTitleMessage: 'Tienes una caja aperturada',
                        modalSubTitleMessage: result.caja.fecha+" "+result.caja.hora,
                        modalButtomTitleMessage:'Ok'
                    });
                } else {

                }
            } else {

            }
        }).catch(error => {
            console.warn("Error caja:" + error)
        });
    }

    getListSuministros = (pageNumber, search) => {
        this.setState({ stateRequest: true }, () => {
            fetch(getDomain() + '/suministros/ListaSuministros.php?page=' + pageNumber + '&search=' + search, {
                method: 'GET'
            }).then(response => {
                if (response.ok) {
                    this.setState({ server: true });
                    return response.json();
                } else {
                    throw "No se puedo completar la petición";
                }
            }).then(response => {
                let result = response;
                if (result.estado == 1) {
                    this.setState({ stateRequest: false, items: result.suministros });
                    this.calculateTotales();
                } else {
                    this.setState({ stateRequest: false, stateMenssage: 'Lista sin datos para mostrar.', items: [] });
                }
            }).catch(error => {
                this.setState({ stateRequest: false, stateMenssage: 'No se puedo completar la carga, por problemas de conexión intente nuevamente.', items: [], server: false });
            });
        });
    }

    getLoadDataBase() {
        this.setState({ server: true });
        fetch(
            getDomain() + '/venta/GetDatosPredeterminados.php', { method: 'GET' }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw "No se puedo completar la petición";
            }
        }).then(result => {
            if (result.estado == 1) {
                this.setState({
                    //moneda datos
                    monedaId: result.moneda.IdMoneda,
                    monedaSimbolo: result.moneda.Simbolo,
                    //cliente datos
                    clienteId: result.cliente.IdCliente,
                    clienteTipoDocumento: result.cliente.TipoDocumento,
                    clienteInformacion: result.cliente.Informacion,
                    clienteNumeroDocumento: result.cliente.NumeroDocumento,
                    clienteDireccion: result.cliente.Direccion,
                    //tipo de documentos datos
                    listComprobantes: result.comprobantes,
                    //lista de impuestos datos
                    listaImpuestos: result.listaImpuestos,
                    //serie y numeracion
                    serie: result.serie,
                    numeracion: result.numeracion
                }, () => {
                    for (let i = 0; i < this.state.listComprobantes.length; i++) {
                        if (this.state.listComprobantes[i].Predeterminado == 1) {
                            this.setState({ selectComprobante: this.state.listComprobantes[i].IdTipoDocumento });
                            break;
                        }
                    }
                });
            } else {
                this.setState({ server: false })
            }

        }).catch(error => {
            this.setState({ server: false })
        });
    }

    getTaxName(impuesto) {
        let valor = "";
        for (let i = 0; i < this.state.listaImpuestos.length; i++) {
            if (this.state.listaImpuestos[i].IdImpuesto == impuesto) {
                valor = this.state.listaImpuestos[i].Nombre;
                break;
            }
        }
        return valor;
    }

    getTaxValue(impuesto) {
        let valor = 0;
        for (let i = 0; i < this.state.listaImpuestos.length; i++) {
            if (this.state.listaImpuestos[i].IdImpuesto == impuesto) {
                valor = this.state.listaImpuestos[i].Valor;
                break;
            }
        }
        return valor;
    }


    onSetCliente = (cliente) => {
        this.setState({
            clienteId: cliente.clienteId,
            clienteTipoDocumento: cliente.clienteTipoDocumento,
            clienteInformacion: cliente.clienteInformacion,
            clienteNumeroDocumento: cliente.clienteNumeroDocumento,
            clienteDireccion: cliente.clienteDireccion,
        })
    }

    openModalErrorConexion = (titulo, mensaje, accion) => (
        <Modal isVisible={this.state.connected === false}>
            <View style={styles.containerModalMsg}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{titulo}</Text>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>{mensaje}</Text>
                <TouchableOpacity
                    onPress={() => this.handleConnectivityChange}
                    style={{
                        width: 'auto',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: 'transparent',
                        justifyContent: 'center'
                    }}>
                    <Text style={{ fontSize: 18, color: '#1565c0', textAlign: "center" }}>{accion}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    openModalErrorServidor = (titulo, mensaje, accion) => (
        <Modal isVisible={this.state.server === false}>
            <View style={styles.containerModalMsg}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{titulo}</Text>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>{mensaje}</Text>
                <TouchableOpacity
                    onPress={() => this.getAllDatos()}
                    style={{
                        width: 'auto',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: 'transparent',
                        justifyContent: 'center'
                    }}>
                    <Text style={{ fontSize: 18, color: '#1565c0', textAlign: "center" }}>{accion}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    openModalValidarVenta = () => (
        <Modal isVisible={this.state.validate === false}>
            <View style={styles.containerModalMsg}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                    {this.state.modalTitleMessage}
                </Text>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>
                    {this.state.modalSubTitleMessage}
                </Text>
                <TouchableOpacity
                    onPress={() => this.setState({ validate: true })}
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        backgroundColor: '#1b3c4f',
                        borderColor: '#1b3c4f',
                        borderRadius: 5,
                        borderWidth: 1,
                        marginVertical: 10
                    }}>
                    <Text style={{ fontSize: 18, color: 'white', textAlign: "center" }}>
                        {this.state.modalButtomTitleMessage}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    getTipoComprobante(idTipoComprobante) {
        fetch(getDomain() + '/venta/GetTipoComprobante.php?idTipoComprobante=' + idTipoComprobante, {
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
                    serie: result.serie,
                    numeracion: result.numeracion
                });
            } else {
                this.setState({
                    serie: result.serie,
                    numeracion: result.numeracion
                });
            }
        }).catch(error => {

        });
    }

    updateProducto = (producto, i) => {
        this.addListVenta[i] = producto;
        this.setState({ listVenta: [...this.addListVenta] });
        this.calculateTotales();

    }

    onMoreProducto = (product, i) => {
        let newProducto = product;
        newProducto.Cantidad = parseFloat(newProducto.Cantidad) + 1;

        newProducto.SubImporte = newProducto.PrecioVentaGeneral * newProducto.Cantidad;
        newProducto.Descuento = newProducto.Descuento * newProducto.Cantidad;
        newProducto.SubTotal = newProducto.SubImporte - newProducto.Descuento;
        newProducto.Total = newProducto.SubTotal;

        this.addListVenta[i] = newProducto;
        this.setState({ listVenta: [...this.addListVenta] });
        this.calculateTotales();
    }

    onLessProducto = (product, i) => {
        let newProducto = product;

        if (product.Cantidad > 1) {
            newProducto.Cantidad = parseFloat(newProducto.Cantidad) - 1;

            newProducto.SubImporte = newProducto.PrecioVentaGeneral * newProducto.Cantidad;
            newProducto.Descuento = newProducto.Descuento * newProducto.Cantidad;
            newProducto.SubTotal = newProducto.SubImporte - newProducto.Descuento;
            newProducto.Total = newProducto.SubTotal;

            this.addListVenta[i] = newProducto;
            this.setState({ listVenta: [...this.addListVenta] });
            this.calculateTotales();
        }

    }

    onRemovedProducto = (product) => {
        var index = this.addListVenta.indexOf(product);
        this.addListVenta.splice(index, 1);
        this.setState({ listVenta: [...this.addListVenta] });
        this.calculateTotales();
    }

    onAddProducto = (item) => {

        if (!this.validateDuplicate(item)) {
            this.addListVenta.push({
                IdSuministro: item.IdSuministro,
                NombreMarca: item.NombreMarca,
                Cantidad: 1,
                Costo: item.PrecioCompra,
                PrecioVentaGeneral: item.PrecioVentaGeneral,
                SubImporte: item.PrecioVentaGeneral * 1,
                Descuento: 0,
                SubTotal: item.PrecioVentaGeneral * 1,
                Total: item.PrecioVentaGeneral * 1,
                Operacion: item.Operacion,
                Impuesto: item.Impuesto,
                ImpuestoName: this.getTaxName(item.Impuesto),
                ImpuestoValor: this.getTaxValue(item.Impuesto),
                Inventario: item.Inventario,
                ValorInventario: item.ValorInventario
            });
            this.setState({ listVenta: [...this.addListVenta] });
            this.calculateTotales();
        } else {
            for (let i = 0; i < this.addListVenta.length; i++) {
                if (this.addListVenta[i].IdSuministro == item.IdSuministro) {
                    let newProducto = this.addListVenta[i];
                    newProducto.Cantidad = newProducto.Cantidad + 1;

                    newProducto.SubImporte = newProducto.PrecioVentaGeneral * newProducto.Cantidad;
                    newProducto.Descuento = newProducto.Descuento * newProducto.Cantidad;
                    newProducto.SubTotal = newProducto.SubImporte - newProducto.Descuento;
                    newProducto.Total = newProducto.SubTotal;

                    this.addListVenta[i] = newProducto;
                    this.setState({ listVenta: [...this.addListVenta] });
                    this.calculateTotales();
                    break;
                }
            }
        }

    }

    validateDuplicate = (product) => {
        let ret = false;
        for (let i = 0; i < this.addListVenta.length; i++) {
            if (this.addListVenta[i].IdSuministro == product.IdSuministro) {
                ret = true;
                break;
            }
        }
        return ret;
    }

    calculateTotales = () => {

        let calculateSubImporte = 0;
        let calculateDescuento = 0;
        let calculateSubTotal = 0;
        let calculateTotal = 0;

        this.addListVenta.forEach(element => {
            calculateSubImporte += element.SubImporte;
            calculateDescuento += element.Descuento;
            calculateSubTotal += element.SubTotal;
            calculateTotal += element.Total;
        });

        this.setState({
            subImporte: calculateSubImporte,
            descuento: calculateDescuento,
            subTotal: calculateSubTotal,
            total: calculateTotal,
        });

    }

    onValidarVenta = () => {
        if (this.state.listVenta.length > 0) {
            if (this.state.selectComprobante != null) {
                if (this.state.clienteInformacion != '' && this.state.clienteNumeroDocumento != '') {
                    this.openModalVentaProceso();
                }
                else {
                    this.setState({ validate: false });
                }
            }
            else {
                this.setState({ validate: false });
            }
        } else {
            this.setState({ validate: false });
        }
    }

    openModalVentaProceso = () => {
        this.setState({ modalVentaProceso: true })
    }

    closeModalVentaProceso = () => {
        this.setState({ modalVentaProceso: false })
    }

    closeModalDatosComprobante = () => {
        this.setState({ modalDatosComprobante: false })
    }

    onNuevaVenta = () => {
        this.addListVenta = [];
        this.setState({ listVenta: [...this.addListVenta] }, () => {
            this.getLoadDataBase();
            this.calculateTotales();
        });

    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Venta',
            headerTitleStyle: { fontSize: 16 },
            headerStyle: { backgroundColor: '#1b3c4f' },
            headerTintColor: '#fff',
            headerRight:
                <View style={{ flexDirection: 'row', padding: 5, flex: 1 }}>
                    <TouchableOpacity style={{ paddingHorizontal: 5, borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 2.5, borderBottomLeftRadius: 2.5 }}
                        activeOpacity={.5}
                        onPress={() => params.onValidarVenta()}>
                        <IconIoni
                            name="md-cash"
                            size={20}
                            color="white" />
                        <Text style={{ color: '#fff', fontSize: 12 }}>Cobrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 5, borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                        activeOpacity={.5}
                        onPress={() => params.onNuevaVenta()}>
                        <MaterialCommunityIcons
                            name="broom"
                            size={20}
                            color="white" />
                        <Text style={{ color: '#fff', fontSize: 12 }}>Limpiar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 5, borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 2.5, borderBottomRightRadius: 2.5 }}
                        activeOpacity={.5}
                        onPress={() => console.warn(params)}>
                        <FontAwesome
                            name="inbox"
                            size={20}
                            color="white" />
                        <Text style={{ color: '#fff', fontSize: 12 }}>Mov. de caja</Text>
                    </TouchableOpacity>
                </View>
        }
    }


    render() {

        return (
            <View style={[styles.container, { opacity: this.state.aperturaCaja == 'none' ? 0.5 : 1 }]}
                pointerEvents={this.state.aperturaCaja}>
                <View style={styles.containerLeft}>
                    <View style={styles.containerLeftSaerch}>
                        <TouchableOpacity activeOpacity={.5} style={styles.butonIco} >
                            <IconIoni
                                name="md-barcode"
                                size={20}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Buscar producto'
                            placeholderTextColor='gray'
                            underlineColorAndroid="transparent"
                            style={styles.inputSearch}
                            onChangeText={(text) => this.onChangeTextSearch(text)}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <IconIoni
                                name="md-search"
                                size={30}
                                style={{ color: 'gray', marginRight: 5 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.getListSuministros(1, '')
                            }}
                            activeOpacity={.5} style={styles.butonIco}
                            style={styles.butonIco}>
                            <IconIoni
                                name="md-refresh"
                                size={30}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.stateRequest || this.state.items.length == 0
                                ? (
                                    <View style={styles.containerError}>
                                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                                            {this.state.stateMenssage}
                                        </Text>
                                    </View>
                                )
                                : (
                                    <GridView
                                        itemDimension={180}
                                        items={this.state.items}
                                        style={styles.gridView}
                                        renderItem={item => (
                                            <Box
                                                product={item}
                                                id={item.IdSuministro}
                                                name={item.NombreMarca}
                                                precio={item.PrecioVentaGeneral}
                                                img={getDomain() + item.Imagen}
                                                monedaSimbolo={this.state.monedaSimbolo}
                                                onAddProducto={this.onAddProducto}
                                            />
                                        )}
                                    />
                                )
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.containerLeftFooter}>
                            <TouchableOpacity activeOpacity={.5} style={styles.butonIco} onPress={() => this.setState({ modalDatosComprobante: true })}>
                                <IconIoni
                                    name="md-person"
                                    size={20}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Cliente'
                                placeholderTextColor='gray'
                                underlineColorAndroid="transparent"
                                editable={false}
                                selectTextOnFocus={false}
                                style={styles.inputSearch}
                                value={this.state.clienteNumeroDocumento + "-" + this.state.clienteInformacion}
                            />
                        </View>
                        <View style={styles.containerLeftFooter}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}>
                                <View style={{ flex: 1 }}>
                                    <Picker
                                        style={{ padding: 0, margin: 0, height: 42 }}
                                        selectedValue={this.state.selectComprobante}
                                        onValueChange={this.onValueChangeComprobantes}>
                                        {this.comprobanteList()}
                                    </Picker>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text>SERIE - N° DE VENTA</Text>
                                    <Text>{this.state.serie + " - " + this.state.numeracion}</Text>
                                    {/* <TextInput placeholder='Cantida' placeholderTextColor='gray' underlineColorAndroid="transparent" keyboardType="numeric"
                                        style={styles.modalInput}
                                    /> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerRight}>
                    <ListItem
                        listVenta={this.state.listVenta}
                        monedaSimbolo={this.state.monedaSimbolo}
                        onLessProducto={this.onLessProducto}
                        onMoreProducto={this.onMoreProducto}
                        onRemovedProducto={this.onRemovedProducto}
                        updateProducto={this.updateProducto}
                    />

                    <View style={{
                        padding: 10, backgroundColor: 'rgb(0, 177, 157)',
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',

                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#1b3c4f', fontSize: 16 }}>TOTAL</Text>
                        <Text style={{ fontWeight: 'bold', color: '#1b3c4f', fontSize: 18 }}>{this.state.monedaSimbolo + ' ' + formatMoney(this.state.total)}</Text>
                    </View>

                </View>

                {
                    this.state.modalVentaProceso ?
                        <VentaProceso
                            visible={this.state.modalVentaProceso}
                            closeModal={() => this.closeModalVentaProceso()}
                            listaProductos={this.state.listVenta}
                            tipoComprobante={this.state.selectComprobante}
                            empleadoId={this.state.usuarioId}
                            clienteId={this.state.clienteId}
                            clienteTipoDocumento={this.state.clienteTipoDocumento}
                            clienteNumeroDocumento={this.state.clienteNumeroDocumento}
                            clienteInformacion={this.state.clienteInformacion}
                            clienteDireccion={this.state.clienteDireccion}
                            monedaId={this.state.monedaId}
                            monedaSimbolo={this.state.monedaSimbolo}
                            subImporte={this.state.subImporte}
                            descuento={this.state.descuento}
                            total={this.state.total}
                        />
                        : null
                }


                {this.state.modalDatosComprobante ?
                    <DatosComprobante
                        clienteId={this.state.clienteId}
                        clienteTipoDocumento={this.state.clienteTipoDocumento}
                        clienteInformacion={this.state.clienteInformacion}
                        clienteNumeroDocumento={this.state.clienteNumeroDocumento}
                        clienteDireccion={this.state.clienteDireccion}
                        visible={this.state.modalDatosComprobante}
                        closeModal={() => this.closeModalDatosComprobante()}
                        onSetCliente={this.onSetCliente}
                    />
                    : null

                }

                {
                    this.state.connected ?
                        null
                        : this.openModalErrorConexion(
                            'Error de red',
                            'No tienes conexión. Comprueba la conexión',
                            'Reintentar')
                }

                {
                    this.state.server ?
                        null
                        : this.openModalErrorServidor('Error de servidor', 'Problemas con el servidor. Comprueba la conexión', 'Reintentar')

                }

                {
                    this.state.validate ?
                        null
                        : this.openModalValidarVenta()

                }


            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        flexDirection: 'row'
    },
    //-----------------------------------------------------------------
    containerLeft: {
        flex: 2,
        flexDirection: 'column',
        marginHorizontal: 5,
        marginVertical: 7.5,
        backgroundColor: '#fff',
    },
    containerLeftSaerch: {
        flexDirection: 'row',
        borderColor: '#1b3c4f',
        borderWidth: 1,
        height: 42,
        marginBottom: 5
    },
    inputSearch: {
        flex: 1,
        fontSize: 14,
        backgroundColor: 'white',
        color: 'black',
    },
    butonIco: {
        backgroundColor: '#1b3c4f',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    icon: {
        marginHorizontal: 6,
        color: '#ffffff'
    },
    gridView: {
        flex: 1
    },
    containerLeftFooter: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#1b3c4f',
        borderWidth: 1,
        height: 42,
    },
    //--------------------------------------------------------------------
    containerRight: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 5,
        marginVertical: 7.5,
        backgroundColor: '#fff',
    },
    //--------------------------------------------------------------------
    containerError: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    //--------------------------------------------------------------------
    containerModalMsg: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 2.5
    }
});