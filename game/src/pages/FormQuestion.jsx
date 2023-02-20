import { View, Text, TextInput, Button } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react'
import axios from 'axios'

const FormQuestion = () => {
    const [quest, setQuest] = useState({
        question: '',
        description: '',
        response: ''
    })
    console.log(quest)

    const handleQuest = () => {
    
      
            axios.post('http://192.168.1.16:5174/question', quest)
            .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error);
              });
              setQuest({...quest, 
                question: '',
                description: '',
                response: '',
            })
              
    }
  return (
    <View style={{flex: 1,width: '100%', alignItems: 'center', backgroundColor: 'gray'}}>
         <Text>Question:</Text>
      <TextInput style={{backgroundColor:'#fff', width:'100%',color:'#000'}} value={quest.question} onChangeText={text => setQuest({...quest, question: `¿${text}?`})} />

      <Text>Description:</Text>
      <TextInput style={{backgroundColor:'#fff', width:'100%',color:'#000'}} value={quest.description} onChangeText={text => setQuest({...quest, description: text})} />

      <Text>Response:</Text>
      <Picker
  selectedValue={quest.response}
  style={{ height: 50, width: 100 }}
  onValueChange={(itemValue, itemIndex) => setQuest({...quest, response: itemValue})}
>
  <Picker.Item label="verdad" value="verdad" />
  <Picker.Item label="mito" value="mito" />
</Picker>

      <Button title="Submit" onPress={() => handleQuest()} />
    </View>
  )
}

export default FormQuestion