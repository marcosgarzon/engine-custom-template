const express = require('express');
const fs = require('fs');
const app = express();
const server = app.listen(8080, () => console.log('Server Up!'));

app.engine('cte', (filePath, ObjectToReplace, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(new Error(err))
        const template = content.toString()
            .replace("$$titulo$$", ObjectToReplace.titulo)
            .replace("$$mensaje$$", ObjectToReplace.mensaje)
            .replace("$$autor$$", ObjectToReplace.autor)
            .replace("$$version$$", ObjectToReplace.version)
            return callback(null, template)
    })
});

app.set('views', './views');
app.set('view engine', 'cte');

app.get('/', (req, res) => {
    res.render('Bienvenida', {
        titulo: "CUSTOM CUSTOM ",
        mensaje: "Hello Custom Template",
        autor: "Marcos Garzon",
        version: "1.0"
    })
});