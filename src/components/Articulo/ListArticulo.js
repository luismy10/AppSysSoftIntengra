import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, FlatList} from 'react-native';
import IconIoni from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddArticulo from './AddArticulo';

export default class ListArticulo extends React.Component {

    constructor(props ) {
        super(props);
        buttonsListArr = [];
        for (let i = 0; i < 100; i++) {
            buttonsListArr.push(
                {key:(i+1)+'', nombre:'Descripcion del articulo',precio:'0.00'}
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View style={style.containerSaerch}>
                    <IconIoni
                        name="md-search"
                        size={18}
                        style={style.iconSearch}
                    />
                    <TextInput
                        placeholder='Busque su Articulo...'
                        placeholderTextColor='gray'
                        underlineColorAndroid="transparent"
                        style={style.inputSearch}
                        onChangeText={this.props.handleSearch}
                    />
                    <TouchableOpacity style={style.butonAdd} activeOpacity={.5} onPress={() =>
                        this.props.navigation.navigate("AddArticulo")}>
                        <IconIoni
                            name="md-add"
                            size={30}
                            style={style.iconAdd}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <FlatList
                        style={style.boxScrollView}
                        data={buttonsListArr}
                        renderItem={({item}) => 
                            <View key={item.key} style={style.boxListView} onTouchStart={() => console.warn('Este es el producto ' + item)}>
                                <Text>{item.key} {item.nombre}</Text>
                                <Text>{item.precio}</Text>
                            </View>
                        }
                    />
                </ScrollView>        
                
                {/*<ScrollView contentContainerStyle={style.boxScrollView} >
                    {buttonsListArr}
                </ScrollView> */}
                
            </View>
        );
    }
}


const tabFooter = createStackNavigator({
    AddArticulo:{ screen:AddArticulo }
});

tabFooter.navigationOptions = {
    header: null
}


const style = StyleSheet.create({
    containerSaerch: {
        flexDirection: 'row',
        borderColor: '#1b3c4f',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 5,
        marginVertical: 10
    },
    iconSearch: {
        marginTop: 12,
        marginLeft: 12,
        marginRight: 4
    },
    inputSearch: {
        flex: 1,
        height: 42,
        fontSize: 14,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 4
    },
    butonAdd: {
        backgroundColor: '#1b3c4f',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    iconAdd: {
        paddingLeft: 15,
        paddingRight: 15,
        color: '#ffffff'
    },
    boxScrollView:{
        flex:1,
        paddingHorizontal:5,
        paddingVertical:5,
        backgroundColor:'#ececec'
    },
    boxListView: {
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderColor: '#ccc', 
        borderWidth: 1, 
        padding: 10,
        margin: 2
    }
    
});