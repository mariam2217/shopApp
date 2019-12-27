// const fs = require('fs');
// const  path = require('path');

// function readDir (path) {
//     return new Promise ((resolve, reject) => {
//         fs.readdir(path, (err,list) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(list);
//         })
//     })
// }


// function readFile (path) {
//     return new Promise ((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(data);
//         })
//     })
// }


// function readStat(path) {
//     return new Promise ((resolve, reject) => {
//         fs.stat(path, (err, stat) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(stat);
//         })
//     })
// }


// async function tree (dir) {
//     const list = await readDir(dir);

//     const result = await Promise.all(list.filter(item => !['node_modules', '.git'].includes(item)).map(async item => {
//         const directory = path.join(dir, item);
//         const stat = await readStat(directory);

//         if (stat.isDirectory()) {

//             return {
//                 [item]: await tree(directory),
//             } 
//         }
        
//         return {
//             [item]: 'file',
//         };
//     }));

//     return Object.assign({}, ...result);


//     const array = [];
//     const fileList = list(dir);
//     for (let i; i<array.length; i++) {
//         if (i.isDirectory()) {
//             array.push(tree(dir+i));
//         }
//         array.push(i);
//     }
//     return array;
// }

// const filePath = [];
// const fileName = 'loginComponent.ts';

// function getPath (fileName) {
//     return new Promise ((resolve, reject) => {

//         if (!filePath.includes(fileName)) {
//         const list = await readDir(dir);
//         const stat = await readStat(directory);
                
//                 if (stat.isDirectory()) {
                    
//                     fs.access(file, fs.constants.F_OK, (err) => {

//                         if (fs.constants.F_OK) {
//                             filePath.path.join(dir, item).split('/');
                        
//                         } filePath(fileName);
//                     }
//                 });
//              return filePath;          
            
//            }
//     });
// };


// (async () => {
//     //const folderStat = await tree('../');
//     const stat = await readStat ('main.ts')
//     //console.log(JSON.stringify(folderStat)); 
//     console.log(stat);
    
// })(); 







