import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export default function Home() {

    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd(){
      if(participants.includes(participantName)){
        return Alert.alert("Participantes existe", "Já há alguém com esse nome");
      }

      setParticipants(prevState => [...prevState, participantName]);
      setParticipantName('');
    }

    function handleParticipantRemove(name: string){
      Alert.alert("Remover", `Remover o participante ${name}?`, [
        {
          text: 'Sim',
          onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
          text: 'Não'
        }
      ])
    }
    
    return (
      <View style={styles.container}>
        
        <Text style={styles.eventName}>
          Copa do Mundo
        </Text>
        
        <Text style={styles.eventDate}>
          Domingo, 20/11/2022
        </Text>

        <View style={styles.form}>
            <TextInput 
              style={styles.input} 
              placeholder="Nome do participante"
              placeholderTextColor="#6b6b6b"
              onChangeText={setParticipantName}
              value={participantName}
            />
            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>

        <FlatList
          data={participants}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Participant
              key={item}
              name={item}
              onRemove={() => handleParticipantRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
              Ninguém chegou ao evento ainda? Adicione participantes à lista de presença.
            </Text>
          )}
        />

        <StatusBar style="auto" />
      </View>
    );
  }