import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
 
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.ong_name}, esotou entrando em contato.`;

    function navigationBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso ${incident.title}`,
            recipients: [incident.ong_email],
            body: message
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.ong_whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#e02141" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.ong_name} de {incident.ong_city}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}