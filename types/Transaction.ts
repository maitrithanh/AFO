
export default interface TransactionModel { 
    id: number,
    transactionID: string,
    content: string,
    amount: number,
    time: string,
    srcAccount: string,
    refNumber: string,
    valid: boolean,
    complete: boolean,
    // "tuition": null
}