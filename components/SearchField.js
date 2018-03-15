/**
 * Created by Михаил on 12.03.2018.
 */
/**
 * Created by Михаил on 12.03.2018.
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Slider } from 'react-native';
export default class SearchField extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            col:1,

        }
    }

    render ()  {
        if (!this.props.slider)
        return     (<View style={styles.search}>
                    <Text style={styles.text}>{this.props.text}</Text>
                    <TextInput style={styles.input} placeholder="Type here to search"/>
                    </View>);
        else return (<View style={styles.search}>
                    <Text style={styles.text}>Columns</Text>
                    <Slider maximumValue={5} minimumValue={1} style={styles.slider} step={1} onValueChange={(val)=>this.setState({col:val})}/>
                    <Text style={styles.text}>{this.state.col}</Text>
                    </View>)
               }
}


const styles = StyleSheet.create({
    search: {
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        padding:10
    },
    text: {
        marginRight:15
    },
    input: {
        width:150,
        height:40,
        textAlign:'center'
    },
    slider: {
        width:150
    }
});
