// This is the first page that is called when a user logs in.
// fetchUser() function instantly fetches the users data to be used.
import React, { Component } from "react";

// Vector Icons Imports
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Component Imports
import FeedScreen from "./main/Feed";
import ProfileScreen from './main/Profile'

// Navigation Tabs Imports
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Navigation Tabs Declaration
const Tab = createMaterialBottomTabNavigator();

// Redux Setup
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../redux/actions/index";

// Creating empty screen for add tab
const EmptyScreen = () => {
  return(null);
}

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
  }
  render() {
    return (
      <Tab.Navigator initialRoute="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="AddContainer"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('Add')
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

// Directed to reducers
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

// Directed to actions
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
