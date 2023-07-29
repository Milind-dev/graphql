const express  = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLScalarType } = require('graphql')

const app  = express();

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const BookType = new GraphQLObjectType({
  name:'Book',
  description:"this is a books obj",
  fields:()=>({
     id:{ type:new GraphQLNonNull(GraphQLInt) },
     name:{ type:new GraphQLNonNull(GraphQLString) },
     authorId:{ type:new GraphQLNonNull(GraphQLInt) },
     author:{
          type:AuthorType,
          resolve:(book) => {
            return authors.find(author => author.id === book.authorId);
            }
          }
    })
})


const AuthorType = new GraphQLObjectType({
  name:'Author',
  description:"this is a book represent author book ",
  fields: () => ({
      id:{ type: new GraphQLNonNull(GraphQLInt) },
      name:{ type: new GraphQLNonNull(GraphQLString) },
      
  })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      books:{
        type:new GraphQLList(BookType),  //BookType,
        description:"List of all Books",
        resolve:()=> books
      }
  }) 
})

const schema = new GraphQLSchema({
  query:RootQueryType
})

app.use("/graphql",expressGraphQL({
    graphiql:true,
    schema:schema
}))
app.listen(5000,()=> console.log("server start 5000"))