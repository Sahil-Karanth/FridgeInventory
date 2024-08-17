import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, Suspense } from "react";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from 'firebase/auth';


import useFetchFridgeID from "../hooks/useFetchFridgeID";

import NotificationsModal from "../components/NotificationsModal";
import SideBarModal from "../components/SideBarModal";

export default function HomePage({ navigation, route }) {
    
    const fridge_id = useFetchFridgeID(auth.currentUser);

    // const [user, setUser] = useState(null);
    // const [NotificationsModalOpen, setNotificationsModalOpen] = useState(false);
    // const [MenuModalOpen, setMenuModalOpen] = useState(false);
    


    // set the home page screen header options
    // useEffect(() => {

    //     console.log(route.params)

    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <TouchableOpacity onPress={() => setMenuModalOpen(true)}>
    //               <Ionicons name="menu" size={40} color="black" />  
    //             </TouchableOpacity>
    //           ),
          
    //           headerRight: () => (
    //             <TouchableOpacity onPress={() => setNotificationsModalOpen(true)}>
    //               <Ionicons name="notifications" size={40} color="black" />
    //             </TouchableOpacity>
    //           ),

    //           headerTitleAlign: 'center',

    //     });
    // }, [navigation]);



    return (

            <View style={styles.container}>
                                                            
                <TouchableOpacity style={styles.HomePageButtons} onPress={() => navigation.navigate('ScanPage', {fridge_id: fridge_id})}>
                    <Text style={styles.ButtonText}>Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.HomePageButtons} onPress={() => navigation.navigate('DeletePage', {fridge_id: fridge_id})}>
                    <Text style={styles.ButtonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.HomePageButtons} onPress={() => navigation.navigate('ViewPage', {fridge_id: fridge_id})}>
                    <Text style={styles.ButtonText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.HomePageButtons} onPress={() => navigation.navigate('ShoppingListPage', {fridge_id: fridge_id})}>
                    <Text style={styles.ButtonText}>Shopping List</Text>
                </TouchableOpacity>

                {/* <NotificationsModal
                modalOpen={NotificationsModalOpen}
                setModalOpen={setNotificationsModalOpen}
                />

                <SideBarModal
                modalOpen={MenuModalOpen}
                setModalOpen={setMenuModalOpen}
                email={auth.currentUser ? auth.currentUser.email : null}
                onClose={() => setMenuModalOpen(false)}
                signOut={route.params.signUserOut}
                toManageFridgePage={() => console.log("Manage Fridge Page")}
                /> */}
                
                 
            </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eda366",
        justifyContent: "space-evenly",
        justifyContent: "center",
    },

    HomePageButtons: {
        backgroundColor: "#ffffff",
        color: "#ffffff",
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 30,
        alignSelf: "stretch",
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 20,
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.9,
        shadowRadius: 6,
        elevation: 10,
    },

    TimedButton: {
        backgroundColor: "#ffffff",
        color: "#ffffff",
        padding: 10,
        margin: 10,
        justifyContent: "center",
        paddingHorizontal: 20,
        marginVertical: 30,
        alignSelf: "stretch",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 20,
    },

    ButtonText: {
        fontSize: 30,
        color: "#000000",
    },

    ButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    Title: {
        fontSize: 50,
        color: "#000000",
        marginBottom: 80,
    },

});
