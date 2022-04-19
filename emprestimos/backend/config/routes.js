module.exports = app => {
    
    app.route('/professor')
        .post(app.api.professor.salvarProfessor)
        .get(app.api.professor.listarProfessor)

    app.route('/professor/:siape')
        .delete(app.api.professor.removerProfessor)

    app.route('/item')
        .post(app.api.item.salvarItem)
        .get(app.api.item.listarItem)

    app.route('/item/:codigo')
        .delete(app.api.item.removerItem)
    
    app.route('/item/:codItem/professor/:siapeProf')
        .post(app.api.emprestimo.vinculaItemProfessor)
        
    // app.route('/emprestimos')
    //     .get(app.api.item.listarEmprestimos)
}