const ChangeCardOrder = require('../../models/List/ChangeCardOrder')

const changeCardOrder = async (req, res) => {
    const { listToChangeCardsOrder } = req.body

    try {
        if (!listToChangeCardsOrder || listToChangeCardsOrder.length === 0) {
            res.status(404).send('Não foram encontrada as listas')
            return
        }

        const changedCardsOrder = ChangeCardOrder(listToChangeCardsOrder);


        console.log('changedCardsOrder', changedCardsOrder);

        return res.status(200).json(changedCardsOrder);

    } catch (error) {
        res.status(500).send('Algo deu errado com o servidor')
    }
}

module.exports = changeCardOrder;