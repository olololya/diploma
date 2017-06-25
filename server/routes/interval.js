import * as queries from '../queries/interval';

export function getAllIntervals(req, res) {
   queries.getAllIntervals().then(intervals => {
       res.send(intervals);
   }).catch((error) => {
       res.send({ error });
   })
}

export function addInterval(req, res) {
    queries.addInterval(req.body).then(interval => {
        res.send(interval);
    }).catch((error) => {
        res.send(error);
    })
}

export function deleteAllIntervals(req, res) {
    queries.deleteAllIntervals().then(() => {
        res.send(`Массы успешно удалены`);
    }).catch(error => {
        res.send({ error });
    });
}
