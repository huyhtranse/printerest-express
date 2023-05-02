const { buildSchema } = require("graphql");

const schemaGrap = buildSchema(`

    type User {
        email:     String
        user_id:   Int    
        password:  String
        full_name: String
        age:       Int
        avatar:    String
    }

    type Image {
        image_id: Int   
        name:     String
        path:     String
        descr:    String
        user_id:  Int
    }

    type RootQuery {
        getImages: [Image]
    }
    
    type RootMutation{
        getUser(token: String): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);

module.exports = schemaGrap;
