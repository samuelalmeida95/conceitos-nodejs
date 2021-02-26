const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories)
  
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
 const {id} = request.params
 const {title, url, techs} = request.body
 const repositoryIndex = repositories.findIndex(repository => repository.id === id);

if(repositoryIndex === -1) {
  return response.status(400).json({error: 'Repositorio nao encontrado!'})
}
 const repository = {
  id,
  title, 
  url,
  techs,
  likes: repositories[repositoryIndex].likes
}

repositories[repositoryIndex] = repository;
return response.json(repository); 

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(findRepositoryIndex >= 0){
    repositories.splice(findRepositoryIndex, 1)
  }else{
    return response.status(400).json({error: 'Repositorio não encontrado'})
  }
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex === -1) {
    return response.status(400).json({error: 'Repositorio nao encontrado!'})
  }
  
  repositories[repositoryIndex].likes += 1
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
