/**
 * Created by Михаил on 12.03.2018.
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity,TextInput,Slider} from 'react-native';
export default class SearchScreen extends Component {
    constructor(props)  {
        super(props);
        this.state =    {
            cols: 1,
            value:'',
            error:false
                        };
                        }
    goToResults() {
    const {navigate}  = this.props.navigation;
    if (!this.state.value)
        this.setState({error:true});
    else navigate('Result',{cols:this.state.cols,val:this.state.value});
    }
    render ()  {
        //const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Text style={styles.text}>Search Term</Text>
                <TextInput style={styles.input} placeholder="Type here to search" onChangeText={(val)=>this.setState({value:val})}/>
            </View>
            <View style={styles.search}>
                <Text style={styles.text}>Columns</Text>
                <Slider maximumValue={5}
                        minimumValue={1}
                        style={styles.slider}
                        step={1}
                        onValueChange={(val)=>this.setState({cols:val})}/>
                <Text style={styles.text}>{this.state.cols}</Text>
            </View>
        <TouchableOpacity style={styles.button} title="Search" onPress={()=>this.goToResults()}>
        <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
            {this.state.error?<Text style={styles.text}>Please fill Search Term</Text>:null}
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        padding:10
    },
    text: {
        marginRight:15,
        marginLeft:10
    },
    input: {
        width:150,
        height:40,
        textAlign:'center'
    },
    slider: {
        width:150
    },
    button: {
        backgroundColor:'#fff'
    },
    buttonText: {
    color:'#2526ff',
    fontSize:20
    }
});
