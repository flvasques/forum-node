const sequelize = require('../dbService.js');
const Tag = require('../models/tag');


(async () => {    
    
    await sequelize.sync();
    
    Tag.bulkCreate([
        {nome: 'Backend'},
        {nome: 'Frontend'},
        {nome: 'PHP'},
        {nome: 'Java'},
        {nome: 'C/C++'},
        {nome: 'Javascript'},
        {nome: 'C#'},
        {nome: 'Angular'},
        {nome: 'Laravel'},
    ]);
})()