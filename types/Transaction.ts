
export default interface TransactionModel { 
    id: number,
    transactionID: string,
    content: string,
    amount: number,
    time: string,
    srcAccount: string,
    refNumber: string,
    valid: false,
    // "complete": false,
    // "tuition": null
}