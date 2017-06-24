import * as queries from '../queries/transports';
import * as queriesUsers from '../queries/users';

export function getAllTransports(req, res) {
    queries.getAllTransports().then(transports => {
        res.send(transports);
    }).catch(error => {
        res.send({ error });
    })
}

export function getTransportsById(req, res) {
    const {id} = req.params;
    queries.getTransportsById(id).then(transport => {
        res.send(transport);
    }).catch(error => {
        res.send({ error });
    })
}

function updateProfileTransports(res, idUser, transports) {
    queriesUsers.getUserById(idUser).then(user => {
        return queriesUsers.updateTransports(user.personalProfile, transports);
    }).then(profile => {
        res.send(profile.transports);
    }).catch(error => {
        res.send(error);
    });
}

export function addTransport(req, res) {
    const {id, transports, newTransport} = req.body;

    queries.createTransport(newTransport).then(transport => {
        transports.push(transport._id);
        updateProfileTransports(res, id, transports);
    }).catch((error) => {
        res.send(error);
    });
}

export function deleteTransport(req, res) {
    const {id} = req.params;
    const {currentUserId, transports} = req.body;

    queries.deleteTransportById(id).then(() => {
        const index = transports.indexOf(id);
        transports.splice(index, 1);
        updateProfileTransports(res, currentUserId, transports);
    }).catch(error => {
        res.send({ error });
    });
}

export function deleteAllTransports(req, res) {
    queries.deleteAllTransports().then(() => {
        res.send(`Транспорты успешно удалены`);
    }).catch(error => {
        res.send('Ошибка при удалении');
    });
}
