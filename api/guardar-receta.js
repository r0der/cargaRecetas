export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Método no permitido"})
}

const {
medico,
farmacia,
vendedores,
productos,
fechaReceta
} = req.body

export default async function handler(req,res){

const {
medico,
farmacia,
vendedores,
productos,
fechaReceta
} = req.body

const response = await fetch(
"https://api.notion.com/v1/pages",
{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.NOTION_TOKEN}`,
"Content-Type":"application/json",
"Notion-Version":"2022-06-28"
},
body:JSON.stringify({

parent:{database_id:process.env.RECETAS_DB},

properties:{

"Fecha Carga":{
date:{start:new Date().toISOString()}
},

"AIC Lectura":{
multi_select:vendedores.map(v=>({name:v}))
},

"Farmacia":{
relation:[{id:farmacia}]
},

"Médico":{
relation:[{id:medico}]
},

"Productos":{
multi_select:productos.map(p=>({name:p}))
},

"Fecha Receta":{
date:{start:fechaReceta}
}


}

})

})

const data = await response.json()

res.status(200).json(data)

}
