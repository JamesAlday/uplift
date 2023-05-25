# James's Project Notes

- I used [this guide](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project) to get a quick Flask/React/Docker setup
- I first attempted to use react-tables/[TanStack Table](https://tanstack.com/table/v8) to render the data, but it was a bit too complex for my needs, so I switched to [AG Grid](https://www.ag-grid.com/react-data-grid/) which was easier to get rendering.
- AG-Grid turned out to have a learning curve of its own, unfortunately.  It allows for overriding the Set Filter values but I couldn't get it to load any kind of list for the "Primary Skills" section without manually specifying it as I did with the 'active' field.
- Server side filtering is enabled for all of the fields, defaulting to text search.  I have only implemented the "Contains" and "Not Contains" text filter options.


## User Stories
1. Active uses a Filter Set to allow selecting which values to show (true/false)
2. AG-Grid sends an object for each filter applied, and the api code runs each filter on the providers list before returning.
3. I'm not really sure what this one is asking? I tried sorting the list by company and name but could not see any duplicated data, so I don't know if I were supposed to insert data to test this counting system or if there was something else I was missing.
4. I implemented this by turning off sorting on the 'Rating' field and adding a default sort by rating, descending, before other sorting is applied. Even after filtering or sorting it should still return in rating descending order.


# Uplift Matching Engine

## We're building a matching engine and need your help!

You are tasked with creating a light-weight service for sorting, ranking, and displaying a list of skilled service providers. Providers have several attributes which are filterable.

The service should factor in these attributes as well as factors related to the use of the service when generating results.

Below are several user stories which outline the functionality expected in this service, as well as an attached `.json` file with some mock provider data to seed the project. The service can be expressed in any way you choose, as long as there is an interface to generate a list of providers based on the requirements in the user stories.

Please use Python to code the service.

## User Stories

- I would like to be able to exclude/include certain providers from results based on their active property
- I would like to be able to filter through providers on a combination of any of their user traits
- I would like the order of results to adjust based on how many times a provider has been returned; surfacing providers who have been returned fewer times towards the front of the list.
- I would like higher ranked providers to always be surfaced towards the front of the list.

### The user stories purposefully leave room for interpretation and flexibility in how you decide to implement them; don't overthink them. The point of this exercise is to create a body of work we can discuss / review in the followup. Feel free to bring in any other interesting ideas/concepts you would like in a matching engine.

## Things we're looking out for in our review:
- Extensibility of code
- Consistency
- Organization of code
- Familiarity with Python
- Documentation if necessary
- Tests

 
