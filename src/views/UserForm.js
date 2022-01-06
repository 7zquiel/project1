import React, { useContext, useState } from "react"
import { Text, View, TextInput, StyleSheet, Button } from "react-native"
import UsersContext from "../context/UsersContext"

export default props => {

    const [user, setUser] = useState(props.route.params ? props.route.params : {})
    const { dispatch } = useContext(UsersContext)

    return (
        <View style={style.form}>
            <Text style={{ color: 'black' }}>Nome</Text>
            <TextInput
                color={"black"}
                style={style.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Digite o nome"
                placeholderTextColor={'gray'}
                value={user.name}
            />
            <TextInput
                color={"black"}
                style={style.input}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Digite o email"
                placeholderTextColor={'gray'}
                value={user.email}
            />
            <TextInput
                color={"black"}
                style={style.input}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder="Informe a URL do avatar"
                placeholderTextColor={'gray'}
                value={user.avatarUrl}
            />
            <Button
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    })
                    props.navigation.goBack()
                }}
                title="Salvar"
            />
        </View>
    )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
})