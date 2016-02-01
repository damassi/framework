var express = require('express')
var dam = require('ape-dam-entity-client')

dam.setEndpoints(
  'http://entitysvc.dam.timeincapp.lol',
  'search-entity-search-hgobjk5vq7gb6srd37jcy4yrfe.us-east-1.cloudsearch.amazonaws.com',
  'https://search-ape-dam-ecs-test-toun5o4mj7jgz4xwi4vmdsuyay.us-east-1.es.amazonaws.com'
)

var app = express()

app.get('/test', function(req, res) {
  const query = {
    'from': 0,
    'size': 25,
    // 'filter': {
    //   'term': {
    //     'photoAssignment_publication.$id': '1fdd6558df99b7cec269a0b11e318399'
    //   }
    // },
    query: {
      filtered: {
        query: {
          match_phrase_prefix: {
            // _all: 'search text',
            filter: {
              term: {
                'photoAssignment_publication.$id': '1fdd6558df99b7cec269a0b11e318399'
              }
            }
          }
        }
      }
    }
    // sort: {
    //   '$.created': {
    //     order: 'desc'
    //   }
    // }
  }

  const traverse = dam.schema.photoAssignment.graphTraversal

  dam.esSearch('photoAssignment', query, traverse)
    .then(function(results) {
      results.start = 25
      res.send(results)
    })
    .catch(function(error) {
      throw new Error(error)
    })
})

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
