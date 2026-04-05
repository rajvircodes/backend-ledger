const Ledger = require('../models/ledger.model')
const Transaction = require('../models/transaction.model')
const Account = require('../models/account.model')
const emailService = require('../services/email.services')

/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
     * 1. Validate request
     * 2. Validate idempotency key
     * 3. Check account status
     * 4. Derive sender balance from ledger
     * 5. Create transaction (PENDING)
     * 6. Create DEBIT ledger entry
     * 7. Create CREDIT ledger entry
     * 8. Mark transaction COMPLETED
     * 9. Commit MongoDB session
     * 10. Send email notification
 */


const createTransaction = async (req, res) => {
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message:"FromAccount, toAccount amount and idempotencyKey are required"
        });
    }

    const fromUserAccount = await Account.findOne({
        _id:fromAccount
    })
    const toUserAccount = await Account.findOne({
        _id:toAccount
    })


    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json({
            message:"Invalid fromAccount or toAccount"
        })
    }

    /**
     * 2. Validate idempotency key
     */

    const isTransactionAlreadyExists = await Transaction.findOne({
        idempotencyKey:idempotencyKey
    })

    if(isTransactionAlreadyExists){
        if(isTransactionAlreadyExists.status === "COMPLETED"){
          return  res.status(200).json({
                message:"Transaction already processed",
                transaction:isTransactionAlreadyExists
            })
        }
        if(isTransactionAlreadyExists.status === "PENDING"){
           return res.status(200).json({
                message:"Transaction is still processing",
            })
        }
        if(isTransactionAlreadyExists.status === "FAILED"){
          return res.status(500).json({
                message:"Transaction failed",
            })
        }
        if(isTransactionAlreadyExists.status === "REVERSED"){
           return res.status(500).json({
                message:"transaction was reversed, please retry!"
            })
        }
    }

    /**
     * 3. check account status
     */


    if(!fromUserAccount.status === "ACTIVE" || !toAccount.status === "ACTIVE"){
        return res.status(400).json({
            message:"Both fromAccount and toAccount need to be active for process transaction"
        })
    }

    /**
     * 4. Derive sender balance from ledger
     */

    const balance = fromUserAccount.getBalance();

    if(balance < amount){
        return res.status(400).json({
            message:`Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }
}
