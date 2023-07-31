exports.errorPage = (req, res, next) => {
    res.render('404', {
        pageTitle: 'Page not found', 
        path: '404'
    })
}