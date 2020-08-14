import React from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, AsyncStorage, StyleSheet, StatusBar, TextInput, Alert } from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerItems, createStackNavigator } from 'react-navigation';
import ListArticulo from './Articulo/ListArticulo';
import AddArticulo from './Articulo/AddArticulo';
import Venta from '../operciones/Venta';
import CorteCaja from '../operciones/CorteCaja';
import VentaConsulta from '../operciones/VentaConsulta';

class HeaderNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario:''
        }
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          if (value !== null) {
            const empledo = JSON.parse(value);
            this.setState({usuario:empledo.Nombres+' '+empledo.Apellidos});
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    componentDidMount(){
        
    }

    render() {
        return (
            <View style={{ backgroundColor: '#1b3c4f', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity style={{ marginHorizontal: 10 }}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <IconIoni name="md-menu" size={28} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1,flexDirection:'row' }}>
                    <View style={{flex:1}}>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: 'white', fontWeight: 'bold' }}>{this.props.title}</Text>

                    </View>
                    <View style={{ flex:2,flexDirection:'row',justifyContent: 'flex-end'}}>
                        <Text style={{ marginLeft: 10, fontSize: 18, color: 'white', fontWeight: 'bold' }}>{this.state.usuario}</Text>
                    </View>             
                </View>
            </View>
        );
    }
}

class Principal extends React.Component {
    constructor(props) {
        super(props);

    }
    static navigationOptions = {
        title: 'Principal',
        drawerIcon: ({ tintColor }) => (
            <IconIoni
                name="md-home"
                size={24}
                color={tintColor} />
        )
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='#1b3c4f' barStyle="light-content" />
                <HeaderNavigationBar title={'Principal'} {...this.props} />
                <ScrollView style={{ backgroundColor: '#ffffff', paddingTop: 20 }} showsVerticalScrollIndicator={false}>
                    <View style={style.boxOptionfather}>
                        <TouchableOpacity style={style.boxOption} activeOpacity={.5} onPress={() =>
                            this.props.navigation.navigate("AddArticulo") }>
                            <Image source={require('../img/inicio.png')} style={style.boxImg} resizeMode='contain' />
                            <Text style={style.boxText}>Inicio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.boxOption} activeOpacity={.5} onPress={() =>
                            this.props.navigation.navigate("Venta") }>
                            <Image source={require('../img/operaciones.png')} style={style.boxImg} resizeMode='contain' />
                            <Text style={style.boxText}>Punto de Venta</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.boxOptionfather}>
                        <TouchableOpacity style={style.boxOption} activeOpacity={.5} onPress={() =>
                            this.props.navigation.navigate("VentaConsulta") }>
                            <Image source={require('../img/consulta.png')} style={style.boxImg} resizeMode='contain' />
                            <Text style={style.boxText}>Consultas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.boxOption} activeOpacity={.5} onPress={() => 
                            this.props.navigation.navigate("CorteCaja") }>
                            <Image source={require('../img/reporte.png')} style={style.boxImg} resizeMode='contain' />
                            <Text style={style.boxText}>Reportes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.boxOptionfather}>
                        <TouchableOpacity style={style.boxOption} activeOpacity={.5} onPress={() => console.warn('hola 5')}>
                            <Image source={require('../img/grafico.png')} style={style.boxImg} resizeMode='contain' />
                            <Text style={style.boxText}>Graficos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.boxOption} activeOpacity={.5} onPress={() => console.warn('hola 6')}>
                            <Image source={require('../img/configuracion.png')} style={style.boxImg} resizeMode='contain' />
                            <Text style={style.boxText}>Configuracion</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class Logout extends React.Component {

    constructor(props) {
        super(props);
        

    }
    static navigationOptions = {
        title: 'Cerrar Sesión',
        drawerIcon: ({ tintColor }) => (
            <IconIoni
                name="md-exit"
                size={24}
                color={tintColor} />
        )
    };



    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='#1b3c4f' barStyle="light-content" />
                <HeaderNavigationBar title={'Cerrar Sesion'} {...this.props} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="Ya he terminado, dame de baja" onPress={this._signOutAsync} />
                </View>
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    };
}

class Articulo extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Articulos',
        drawerIcon: ({ tintColor }) => (
            <IconIoni
                name="md-pricetag"
                size={24}
                color={tintColor} />
        )
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='#1b3c4f' barStyle="light-content" />
                <HeaderNavigationBar title={'Lista de Articulos'} {...this.props} />
                <ListArticulo {...this.props} />
            </View>
        );
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Usuarios',
        drawerIcon: ({ tintColor }) => (
            <IconIoni
                name="md-person"
                size={24}
                color={tintColor} />
        )
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='#1b3c4f' barStyle="light-content" />
                <HeaderNavigationBar title={'Usuarios'} {...this.props} />
                <Text>hi Users</Text>
            </View>
        );
    }

}


const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', height: 120, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../img/logo.png')} style={{ width: 80, height: 79, borderRadius: 60 }} />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

const Drawer = createDrawerNavigator({
    Home: { screen: Principal },
    Articulo: { screen: Articulo },
    User: { screen: User },
    Logout: { screen: Logout },
    //CorteCaja: { screen: CorteCaja }
    },
    {
        contentComponent: CustomDrawerComponent
});

Drawer.navigationOptions = {
    header: () => null,
};

const apStack = createStackNavigator({
    Drawer: {
        screen: Drawer,
        navigationOptions: {

        }
    },
    AddArticulo: {
        screen: AddArticulo,
        navigationOptions: {
            title: 'Nuevo Articulo',
            headerTitleStyle: { fontSize: 16 },
            headerStyle: { backgroundColor: '#1b3c4f' },
            headerTintColor: '#fff',
            headerRight:
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginTop: 5, marginRight: 15, paddingHorizontal: 5, borderColor: '#fff', borderWidth: 1, borderRadius: 4 }}
                        onPress={() => Alert.alert("Guardar...")}>
                        <IconIoni
                            name="md-save"
                            size={26}
                            color="white" />
                    </TouchableOpacity>
                </View>,

        }
    },
    Venta: {
        screen: Venta,
    },
    CorteCaja: {
        screen: CorteCaja
    },
    VentaConsulta: {
        screen: VentaConsulta
    }
});

apStack.navigationOptions = {
    header: null
}

export default apStack;

const style = StyleSheet.create({
    boxOptionfather: {
        backgroundColor: '#ffffff', padding: 20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap'
    },
    boxOption: {
        backgroundColor: '#ececec', borderRadius: 5, alignItems: 'center', borderColor: '#1b3c4f', borderWidth: 1, padding: 5
        /*shadowColor: '#ff0000',shadowOffset: { width: 0, height: 5 },shadowOpacity: 0.8,shadowRadius: 20,elevation: 24*/
    },
    boxImg: {
        width: 120, height: 90
    },
    boxText: {
        fontSize: 15, color: '#000'
    }
});


