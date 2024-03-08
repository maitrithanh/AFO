import GetMessagesRes from '@/types/GetMessagesRes';
import { HubConnectionBuilder, HttpTransportType, HubConnectionState, HubConnection } from '@microsoft/signalr';

const chatHubUrl = 'https://localhost:7254/chatHub';

var connection: HubConnection = new HubConnectionBuilder()
    .withUrl(chatHubUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
    })
    .build();

export const connectToSignalR = async (token: string) => {
    try {
        connection = new HubConnectionBuilder()
        .withUrl(chatHubUrl, {
            accessTokenFactory: () => token,
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .build();

        if (connection.state !== HubConnectionState.Disconnected) {
            connection.stop();
        }

        if (connection.state === HubConnectionState.Disconnected) { 
            await connection.start();
            console.log('Connected to SignalR server');
        }
        

        connection.on('onError', (data: ErrorData) => {
            console.log('signalR error: ', data)
        })

        return connection;
    } catch (error) {
        console.error('Failed to connect to SignalR:', error);
    }
};

export const disconnectFromSignalR = async () => {
    await connection.stop();
    console.log('Disconnected from SignalR server');
};

export const sendMessage = async (message: string, receiverId: string) => {
    try {
        await connection.invoke('OnChat', message, receiverId);
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};

export const onMessageReceived = (onMessage: (s: GetMessagesRes) => void) => {
    connection.on('onNewMessage', onMessage);
};


export type ContactListData = {
    userId: string,
    avatar: string,
    name: string,
    title: string,
    isOnline: boolean,
  
    newMessage: boolean,
    lastSeen: string //last time user2 see user1's message
}

export const onGetContactList = ( callback: (listData: ContactListData[]) => void) => { 
    connection.on('onGetContactList', (list) => {
        callback(list)
    });
}

interface UserData { 
    userId: string,
    online: boolean
}

export const onNewUserConnect = (callback: (data: UserData) => void) => {
    connection.on('onNewUserConnect', (user) => {
        callback(user)
    });
}

interface ErrorData { 
    method: string,
    error: string
}

export const readMessage = async (receiverId: string) => {
    try {
        await connection.invoke('OnReadMessage', receiverId);
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};

export const OnReadMessage = (callback: (users: {id: string, receiverId: string, time: string}) => void) => {
    connection.on('onReadMessage', callback);
}

export const unBindEvent = (name: string, cb: (...args: any[]) => void) => { 
    connection.off(name, cb);
}


