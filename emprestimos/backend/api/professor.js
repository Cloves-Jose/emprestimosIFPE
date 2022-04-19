module.exports = app => {

    const salvarProfessor = (req, res) => {
        if(!req.body.nome) {
            return res.status(400).send(`Nome é um campo obrigatório`)
        }
        if(!req.body.telefone) {
            return res.status(400).send(`Telefone é um campo obrigatório`)
        }
        if(!req.body.siape) {
            return res.status(400).send(`Siape é um campo obrigatório`)
        }

        app.db('professor')
            .insert({nome: req.body.nome, telefone: req.body.telefone, siape: req.body.siape})
            .then(_ => res.status(201).send())
            .catch(err => res.status(500).json(err))
    }

    const removerProfessor = (req, res) => {
        if(!req.params.siape) {
            return res.status(400).send(`É obrigatório informar o siape`)
        }

        app.db('professor')
            .where({siape: req.params.siape})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `O siape não corresponde a nenhum professor`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const listarProfessor = async (req, res) => {
        await app.db('professor')
            .select(`nome`, `telefone`, `siape`)
            .then(professor => res.status(200).send(professor))
            .catch(err => res.status(500).json(err))
    }

    return { salvarProfessor, removerProfessor, listarProfessor }
}