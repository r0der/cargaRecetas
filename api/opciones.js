export default async function handler(req, res) {

try {

const response = await fetch(
`https://api.notion.com/v1/databases/${process.env.RECETAS_DB}`,
{
method:"GET",
headers:{
"Authorization":`Bearer ${process.env.NOTION_TOKEN}`,
"Notion-Version":"2022-06-28"
}
})

const data = await response.json()

const vendedores =
data.properties["AIC Lectura"]?.select?.options?.map(o=>o.name) || []

const productos =
data.properties["Productos"]?.multi_select?.options?.map(o=>o.name) || []

res.status(200).json({
vendedores,
productos
})

} catch(error){

res.status(500).json({
error:error.message
})

}

}
