export default interface PaymentModel { 
    id: number,
    content: string,
    paidTime: string,
    startTime: string,
    endTime: string,
    paid: number,
    total: number,
    status: string,
    statusCode: string,
    note: string,
    childID: string,
    parentName: string,
    studentName: string,
    phoneNumber: string,
    classRoom: string,
    qrUrl: string
}

export const getPaymentStatusStyle = (s: string): string => {
    switch (s) {
        case '0': return 'gray-400'
        case '1': return 'green-400'
        case '2': return 'blue-400'
        case '3': return 'amber-400'
        default: return ''
    }
}