const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Lycan8182:<Univer@8182>@cluster0-u0x5u.gcp.mongodb.net/<teste>?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("test").collection("Funcionarios")
  if(collection){
      console.log('Conectado ao banco')
  }  
  // perform actions on the collection object
  client.close();
});

async function createMultipleListings(client, dados){
    const result = await client.db("Teste").collection("funcionarios").insertMany(dados);

    console.log(`${result.insertedCount} novas listagens criadas com os seguintes IDs:`);
    console.log(result.insertedIds);

await createMultipleListings(client, [
    {
        name: "Vithor",
        charge: "Analista de sistemas",
        setor: "Tecnologia da informação",
        salario: 2000,
        nivel: 'Sannin'
    },
    {
        name: "Rodrigo",
        charge: "Estagiario",
        setor: "PetShop",
        salario: 0,
        nivel: 'buxa'
    },
    {
        name: "Gabriel",
        charge: "Despedido",
        setor: "Rua",
        salario: "me deve um pombo",
        nivel: 'Trouxa'
    }
]);
}
