#!/usr/bin/env node

import yargs from 'yargs';
import userStore from './store/user';
import todosStore from './store/todos';

let e = false;

const options = yargs
    .usage("Usage: -e <email>")
    .option("e", { alias: "email", describe: "Your email with @gmail.com", type: "string", demandOption: true })
    .argv;

const args = process.argv

// console.log(args);

if (options.email) {
    const email = options.email;

    if (!email.endsWith('@gmail.com')) {
        e = true;
        console.log('Harus menggunakan email @gmail.com');
    }

    let name = email;
    name = name.split('@').shift().replace(/\W/g, '');

    console.log("Your name is " + name);

    userStore.editSingle({
        id: name,
        email,
    });

    // console.log(userStore.data);

    // todosStore.addItem({
    //     text: "teststs",
    //     tags: "-",
    //     status: 'todo',
    // }, userStore.data);

    // todosStore.setName(name);
    // todosStore.initialize();

    // console.log(todosStore.data);

    if (!todosStore.data.length) {
        e = true;
        console.log('Anda tidak mempunyai Todo list');
    }

    // todosStore.data.forEach(item => console.log(item));
}

if (!e) {
    console.log("Done!");    
}

