import * as queries from '../queries/weight';

export function getAllWeights(req, res) {
   queries.getAllWeights().then(weights => {
       res.send(weights);
   }).catch((error) => {
       res.send({ error });
   })
}

export function addWeight(req, res) {
    queries.addWeight(req.body).then(weight => {
        res.send(weight);
    }).catch((error) => {
        res.send(error);
    })
}

export function deleteAllWeights(req, res) {
    queries.deleteAllWeights().then(() => {
        res.send(`Массы успешно удалены`);
    }).catch(error => {
        res.send({ error });
    });
}
