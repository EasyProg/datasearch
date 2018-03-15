/**
 * Created by Михаил on 12.03.2018.
 */
/**
 * Created by Михаил on 12.03.2018.
 */
import React, {Component} from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
         Slider,
         Image ,
         Dimensions,
         ScrollView,
         ActivityIndicator,
         AppState,
         AsyncStorage} from 'react-native';
import _ from 'lodash';
const {width, height} = Dimensions.get('window');
export default class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            isLoaded:false,
            appState:AppState.currentState
                     }
                     }
    _handleAppStateChange = (nextAppState) => {
        this.setState({appState: nextAppState});
        if (nextAppState==='background')
        {
            try {
                AsyncStorage.setItem('searchState',JSON.stringify(this.state.res));
            }
            catch (error) {
            //Some error
            }
        }
        else if (nextAppState==='active') {
            try {
            //await
                this.setState({res:JSON.parse(AsyncStorage.getItem('searchState'))});
            }
            catch (error) {
            //Some error
            }
        }
            };
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    getApiData()    {
    let key = 'muagw7h64kn9tvfsz3p3kgqg';
    fetch(`https://api.gettyimages.com/v3/search/images?phrase=${this.props.navigation.state.params.val}`,{
    method:'get',
    headers: {'Api-Key':key}
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({isLoaded:true,res:responseJson.images});
            return responseJson.images;
        })
        .catch((error) => {
            console.error(error);
        });
    }
    componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.getApiData();
    }
    render ()
    {
        let { params } = this.props.navigation.state;
        let cols = this.state.res.length > 0? Math.ceil(this.state.res.length/params.cols):20;
        let imgWidth = (width / params.cols)-((params.cols+1)*10)/params.cols;
            //- (10 * (params.cols-1));
        let images = _.chunk(this.state.res,cols).map(
        (img,idx)=>
        <View style={styles.rows} key={idx}>
        {
        img.map((item,i)=><Image style={{width:imgWidth,
                                         height:imgWidth,marginRight:10,marginBottom:10}}
                                                 source={{uri:item.display_sizes[0].uri}} key={i}/>)
        }
        </View>
        );
        if (this.state.isLoaded)
        return (
            <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.list}>{images}</ScrollView>
            </View>
        );
        else return (
            <View style={styles.containerDownload}>
                <ActivityIndicator color="#bfff80" size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10
    },
    containerDownload:
        {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10
        },
    rows:
    {
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'flex-start'
    },
    text:
    {
    marginRight:15
    },
    list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
    },
});
