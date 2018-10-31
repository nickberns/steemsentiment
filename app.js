var steemjs = require('steemjs');

const ACCOUNT_NAME = 'sambillingham'
        const WALLET_FILTER = 'transfer'
        steem.api.getAccountHistory(ACCOUNT_NAME, -1, 50, (err, result) => {
          let transfers = result.filter( tx => tx[1].op[0] === WALLET_FILTER )
          displayTransactions(transfers)
        });
        function displayTransactions(transactions){
          transactions.forEach((tx) => {
            let transfer = tx[1].op[1]
            let template =
            `<tr>
              <td>${transfer.from}</td>
              <td>${transfer.to}</td>
              <td>${transfer.amount}</td>
              <td>${transfer.memo}</td>
            </tr>`
            $('tbody').prepend(template)
          });
        }
