module.exports = app => {

    const salvarItem = (req, res) => {
        if(!req.body.tipo) {
            return res.status(400).send(`O tipo deve ser informado obrigatoriamente`)
        }

        if(!req.body.codigo) {
            return res.status(400).send(`O código deve ser informado obrigatoriamente`)
        }

        app.db('item')
            .insert({tipo: req.body.tipo, codigo: req.body.codigo})
            .then(_ => res.status(201).send())
            .catch(err => res.status(500).json(err))
    }

    const removerItem = (req, res) => {
        if(!req.params.codigo) {
            return res.status(400).send(`É obrigatório informar o código do produto`)
        }

        app.db('item')
            .where({codigo: req.params.codigo})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `O código não corresponde a nenhum produto`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const listarItem = async (req, res) => {
        await app.db('item')
            .select(`tipo`, `codigo`)
            .then(item => res.status(200).send(item))
            .catch(err => res.status(500).json(err))
    }

    return { salvarItem, removerItem, listarItem }
}