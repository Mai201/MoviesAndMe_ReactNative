import React from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
// import FilmItem from './FilmItem';
import FilmList from './FilmList';
import { getFilmsFromApiWithSearchedText } from '../API/TMDB_API';

class Search extends React.Component {
    
    constructor(props) {
        super(props)
        // infos non affichées dans render, donc variables de classe
        this.searchedText= ''
        this.page = 0
        this.totalPages = 0
        // infos affichées dans render, donc dans state
        this.state = { 
            films:[],
            isLoading: false
        }
        this._loadFilms = this._loadFilms.bind(this)
    }
    
    _searchTextInputChanged(text) {
        this.searchedText= text
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading:true })
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1)
          .then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                  films: [...this.state.films, ...data.results],
                  isLoading:false
              })
          })
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({ 
            films: [] 
        },
        () => {
            this._loadFilms()
        })
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id "+ idFilm)
        this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
    }

    render () {
        return (
            <View style={ styles.main_container }>
                <TextInput
                    style={ styles.textinput } 
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms}
                />
                <Button 
                    title='Rechercher' 
                    onPress={() => this._searchFilms()}
                />
                {/* <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <FilmItem 
                            film={item} 
                            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                            displayDetailForFilm={this._displayDetailForFilm} 
                        />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        this.page < this.totalPages ? this._loadFilms() : null 
                    }}
                /> */}
                <FilmList 
                    films = {this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) 



export default Search;