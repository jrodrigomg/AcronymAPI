let ACRONYM = require("../models/acronym.model.js")
let cfg = require('../config.js');
const jwt = require('jsonwebtoken');


/*SOLO PARA MOSTRAR ALGUNAS OTRAS FUNCIONALIDADES SE HA CREADO ESTE ENDPOINT PARA GENERAR UN TOKEN */
exports.getTokenTest = async function(req, res, next)
{
    try
    {
        const token = jwt.sign({user:"hola2", rol:1},cfg.secret_jwt_key, {expiresIn: parseInt( cfg.expiredTime)});
        res.status(200).send({msg:"success", valid:true, token:token});
    }catch(err)
    {
            console.log(err)
            res.status(500).send({msg:"We have an error, please contact the administrator.", valid:false})
    }
}



/** CREACION DE UN ACRONYM*/
exports.addAcronym = async function(req, res, next)
{
    if(true) //Sin permisos
    {
        let body = req.body

        let acronyms = await ACRONYM.find({
            $or:[

                {eliminated: { $exists: false }},
                {eliminated:false}
            ],
            name:body.name
        })

        if(acronyms && acronyms.length>0)
            return res.status(200).send({valid:false, msg:'Acronym already exists.'})

        let tmp = {
            name: body.name,
            description: body.description,
            eliminated:false,
        }

        let acronym = new ACRONYM(tmp);
        let saved = await acronym.save()
        if(saved)
        {
            res.status(200).send({valid:true, msg:'Done!'})
        }else
        {
            res.status(500).send({valid:false, msg:'We have an error, please contact the administrator.'})
        }
    }else{
        res.status(200).send({msg:"You don't have the permission to do this operation.", valid:false})
    }
}


/** LISTA DE RANDOM ACRONYMS */
exports.getRandomAcronyms = async function(req, res, next)
{
    try
    {
        if(true) //Sin permisos
        { 
            let params = req.params

            //Validando parametros
            if(!params.count )
                return res.status(200).send({valid:false, msg:'Invalid request', acronyms:null});
    
            let count = Number(params.count);
            //Que no sea eliminado y tomando la muestra
            let query = [
                {
                    $match:
                    {
                        $or:[
                            {eliminated: {$exists: false}},
                            {eliminated:false}
                        ]
                    }
                },
                {
                    $sample:
                    {
                        size: count
                    }
                }
            ]


            let acronyms = await ACRONYM.aggregate([query])
            if(acronyms.length > 0)
            {
                res.status(200).send({valid:true, msg:'items', acronyms:acronyms})
            }else
            {
                res.status(200).send({valid:false, msg:'0 items', acronyms:null})
            }
        }else{
            res.status(403).send({msg:"You don't have the permission to do this operation.", valid:false})
        }

    }catch(e)
    {
        console.error(e);
        res.status(500).send({msg:"We have an error, please contact the administrator.", valid:false})
    }
}

/** LISTA DE ACRONYM */
exports.listAcronyms = async function(req, res, next)
{
    try
    {
        if(true) //Sin permisos
        { 
            let params = req.query

            //Validando parametros
            if(!params.from || !params.limit || !params.search)
                return res.status(200).send({valid:false, msg:'Invalid request', acronyms:null});
    
            
            let from = parseInt(params.from);
            let limit = parseInt(params.limit);
            
            //Que no sea eliminado
            let query = {
                $or:[
                    {eliminated: {$exists: false}},
                    {eliminated:false}
                ],
                name:{'$regex': `^${params.search}`}
            }
    
            // let acronyms = await ACRONYM.fuzzySearch(params.search,query).sort({_id:1}).limit(limit).skip(from).exec()
            
            //Paginacion
            let options = {
                sort:{_id:1},
                offset:from,
                limit:limit
            }


            let result = await ACRONYM.paginate(query, options)
            let acronyms = result.docs;
            let status = 200;
            if(result.nextPage)
            {
                //Colocar en el header el flag como true 
                res.setHeader('Content-Range','acronyms ' + from + '-' + (from + limit) + '/' + result.totalPages *limit)
                status = 206;
            }

            if(acronyms.length > 0)
            {
                res.status(status).send({valid:true, msg:'items', acronyms:acronyms})
            }else
            {
                res.status(200).send({valid:false, msg:'0 items', acronyms:null})
            }
        }else{
            res.status(403).send({msg:"You don't have the permission to do this operation.", valid:false})
        }

    }catch(e)
    {
        console.error(e);
        res.status(500).send({msg:"We have an error, please contact the administrator.", valid:false})
    }
}

/** LISTA DE ACRONYM */
exports.listAcronym = async function(req, res, next)
{
    if(true) //Sin permisos
    { 

        let query = {
            $or:[

                {eliminated: { $exists: false }},
                {eliminated:false}
            ],
        }


        let acronyms = await ACRONYM.find(query)
        
        if(acronyms.length > 0)
        {
            res.status(200).send({valid:true, msg:'items', acronyms:acronyms})
        }else
        {
            res.status(200).send({valid:false, msg:'0 items', acronyms:null})
        }
    }else{
        res.status(403).send({msg:"You don't have the permission to do this operation.", valid:false})
    }
}


/** GET ACRONYM */
exports.getAcronym = async function(req, res, next)
{
    if(true) //Sin permisos
    { 
        let params = req.params

        let query = {
            $or:[
                {eliminated: { $exists: false }},
                {eliminated:false}
            ],
            name:params.acronym
        }

        

        let acronym = await ACRONYM.findOne(query)
        
        if(acronym)
        {
            res.status(200).send({valid:true, msg:'success', acronym:acronym})
        }else
        {
            res.status(200).send({valid:false, msg:'0 items', acronym:null})
        }
    }else{
        res.status(403).send({msg:"You don't have the permission to do this operation.", valid:false})
    }
}



/** EDITAR ACRONYM */
exports.editAcronym = async function(req, res, next)
{
    if(true)//Sin permisos
    {
        let params = req.params
        let body = req.body

        let item = await ACRONYM.findOne({name:params.acronym})


        // Modificar valores de item
        if(body.name && body.name!=="")
        {
            //Buscando repetidos
            let acronyms = await ACRONYM.find({
                $or:[

                    {eliminated: { $exists: false }},
                    {eliminated:false}
                ],
                name:body.name
            })
            if(acronyms && acronyms.length>0 && acronyms[0]._id !== item._id)
                return res.status(200).send({valid:false, msg:'Already exist.'})
            item.name = body.name
        }
        if(body.description && body.description !== "")
            item.description = body.description

        let save = item.save()
        
        if(save)
        {
            res.status(200).send({valid:true, msg:'Done.'})
        }else{
            res.status(200).send({valid:false, msg:'We have an error, please contact the administrator.'})
        }
    }else{
        res.status(403).send({msg:"You don't have the permission to do this operation.", valid:false})
    }
}

/** EDITAR ACRONYM */
exports.deleteAcronym = async function(req, res, next)
{
    if(true)//Sin permisos
    {
        let params = req.params

        let item = await ACRONYM.findOne({name:params.acronym})

        // Eliminar
        item.eliminated = true;

        let save = item.save()
        
        if(save)
        {
            res.status(200).send({valid:true, msg:'Done.'})
        }else
        {
            res.status(500).send({valid:false, msg:'We have an error, please contact the administrator.'})
        }
    }else
    {
        res.status(200).send({msg:"You don't have the permission to do this operation.", valid:false})
    }
}