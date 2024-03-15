
export default interface GetMessagesRes { 
    msgId: number,
    senderId: string,
    receiverId: string,
    message: string,
    time: string
    reaction: string
    filePath: string
}