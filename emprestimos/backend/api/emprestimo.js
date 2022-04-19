const moment = require('moment')
const data = new Date()
module.exports = app => {

    const dataAtual = () => {
        let dia = String(data.getDate()).padStart(2, '0')
        let mes = String(data.getMonth() + 1).padStart(2, '0')
        let ano = data.getFullYear()

        let dataAtual = dia + '/' + mes + '/' + ano
        return dataAtual
    }


    const vinculaItemProfessor = (req, res) => {
        if(!req.params.codItem){
            return res.status(400).send(`É necessário selecionar um ítem`)
        }
        if(!req.params.siapeProf){
            return res.status(400).send(`É necessário selecionar um professor`)
        }

        app.db('emprestimo')
            .insert({siapeProf: req.params.siapeProf, codItem: req.params.codItem, dataEmp: dataAtual()})
            .then(_ => res.status(201).send())
            .catch(err => res.status(500).json(err))
    }

    const removerEmprestimo = (req, res) => {
        app.db('emprestimo')
            .where({codigo: req.params.codigo})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi possível realizar a operação`
                    res.status(400).send(msg)
                }
            })
    }

    const listarEmprestimos = async (req, res) => {
        await app.db('emprestimo')
            .select(`codigo`, `siapeProf`, `codItem`, `dataEmp`)
            .then(emprestimo => res.status(200).send(emprestimo))
            .catch(err => res.status(500).json(err))
    }

    return { vinculaItemProfessor, listarEmprestimos, removerEmprestimo }
}