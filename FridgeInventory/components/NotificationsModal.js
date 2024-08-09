import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, getDoc, query, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db, auth } from '../firebaseConfig.js';

// hooks
import useFetchFridgeID from '../hooks/useFetchFridgeID.js';

// utility functions
import { getTodayDate } from '../functions/utility_functions.js';

export default function NotificationsModal(props) {

    const fridge_id = useFetchFridgeID(auth.currentUser);

    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
    
        console.log("getting notifications");

        console.log("check: ", fridge_id);

        // get all docs in the notifications collection
        const fridgeRef = collection(db, "fridges", fridge_id, "notifications");
        const querySnapshot = await getDocs(fridgeRef);
        const docs = querySnapshot.docs;

        let notifications = [];
        docs.forEach(doc => {
            notifications.push([doc.data().product_name, doc.data().date_added]);
        });

        console.log("notifications: ", notifications);

        setNotifications(notifications);

    }

    const getNotificationText = (notification_array) => {
        const notification_date_parts = notification_array[1].split("/");
        
        const notification_date = new Date(notification_date_parts[2], notification_date_parts[0] - 1, notification_date_parts[1]);
        const today_date = new Date();

        const diffTime = Math.abs(today_date - notification_date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // return "You added " + notification_array[0] + " " + diffDays + " days ago";
        return `${notification_array[0]} added ${diffDays} days ago`;
    };
    
    useEffect(() => {
        getNotifications();

    }, [props.modalOpen]);

    return (
        <Modal visible={props.modalOpen} animationType='slide' transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <FlatList
                        data={notifications}
                        style={styles.UsersScroll}
                        renderItem={({ item }) => (
                            <View style={styles.TableRow}>
                                <Text style={styles.text}>{getNotificationText(item)}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity onPress={() => props.setModalOpen(false)}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
    },
    TableRow: {
        flexDirection: "row",
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#63bcf7',
        marginVertical: 15,
    },

    text: {
        fontSize: 20,
    },

});