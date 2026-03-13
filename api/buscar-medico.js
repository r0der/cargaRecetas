export default async function handler(req,res){

const q = req.query.q

const response = await fetch(
`https://api.notion.com/v1/databases/${process.env.MEDICOS_DB}/query`,
{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.NOTION_TOKEN}`,
"Notion-Version":"2022-06-28",
"Content-Type":"application/json"
},
body:JSON.stringify({

filter:{
or:[
{
property:"Matricula Nacional",
rich_text:{contains:q}
},
{
property:"Matricula Provincial",
rich_text:{contains:q}
},
{
property:"Nombre",
title:{contains:q}
}
]

}

})
})

const data = await response.json()

const resultados = data.results.map(m=>({

id:m.id,
nombre:m.properties.Nombre.title[0]?.plain_text || "",
matricula:
m.properties["Matricula Nacional"].rich_text[0]?.plain_text ||
m.properties["Matricula Provincial"].rich_text[0]?.plain_text ||
""

}))

res.status(200).json(resultados)

}
