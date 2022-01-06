import React, { useContext } from "react"
import { View, Text, FlatList, Alert } from "react-native"
import { ListItem, Avatar, Button } from "react-native-elements"
import UsersContext from "../context/UsersContext"

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmDelete(user) {
        Alert.alert('Delete User', 'Deseja excluir o usuário?', [
            {
                text: "Sim",
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: "Não"
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem.Swipeable
                key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}
                rightContent={
                    <Button
                        onPress={() => confirmDelete(user)}
                        title="Delete"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    />
                }
            >
                <Avatar source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem.Swipeable>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}