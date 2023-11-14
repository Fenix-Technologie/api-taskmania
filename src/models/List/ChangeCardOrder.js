const List = require('.')

const ChangeCardOrder = async (listToChangeCardsOrder) => {
    let changedLists = [];
    listToChangeCardsOrder.forEach(async (element) => {
        let listChanging = await List.findByIdAndUpdate({
            _id: element._id
        }, {
            $set: {
                cards: element.cards
            }
        }, {
            returnDocument: 'after'
        })

        changedLists.push(listChanging)
    });

    return changedLists
}

module.exports = ChangeCardOrder;

