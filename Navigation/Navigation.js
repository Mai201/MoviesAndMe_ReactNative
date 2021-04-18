import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';

import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import News from '../Components/News';

const Stack = createStackNavigator();
const Tab= createBottomTabNavigator();

function SearchNavig() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Search' 
                component={Search} 
                options={{ title:'Rechercher' }}
            />
            <Stack.Screen
                name='FilmDetail'
                component={FilmDetail}
                options={{ title:'Détail du film' }}
            />
        </Stack.Navigator>
    ) 
}

function FavoritesNavig() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Favorites' 
                component={Favorites} 
                options={{ title:'Favoris' }}
            />
            <Stack.Screen
                name='FilmDetail'
                component={FilmDetail}
                options={{ title:'Détail du film' }}
            />
        </Stack.Navigator>
    ) 
}

function NewsNavig() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='News' 
                component={News} 
                options={{ title:'Les derniers films' }}
            />
            <Stack.Screen
                name='FilmDetail'
                component={FilmDetail}
                options={{ title:'Détail du film' }}
            />
        </Stack.Navigator>
    ) 
}

export default function MyTabs() {
    return(
        <NavigationContainer>
            <Tab.Navigator 
                tabBarOptions={{ 
                    activeBackgroundColor: '#DDDDDD', 
                    inactiveBackgroundColor: '#FFFFFF',
                    showLabel: false, 
                    showIcon: true
                }}
            >
                <Tab.Screen 
                    name="SearchNavig" 
                    component={SearchNavig}
                    options={{ tabBarIcon: () => {
                        return <Image
                            source={require('../Images/ic_search.png')}
                            style={styles.icon}/>
                    } }} 
                />
                <Tab.Screen 
                    name="Favorites" 
                    component={FavoritesNavig}
                    options={{ tabBarIcon: () => {
                        return <Image 
                            source={require('../Images/ic_favorite.png')}
                            style={styles.icon}/>
                    } }} 
                />
                <Tab.Screen 
                    name="News" 
                    component={NewsNavig}
                    options={{ tabBarIcon: () => {
                        return <Image 
                            source={require('../Images/ic_fiber_new.png')}
                            style={styles.icon}/>
                    } }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  })


