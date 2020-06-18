import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:8081/',
    credentials: 'include',
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export default apolloProvider;
