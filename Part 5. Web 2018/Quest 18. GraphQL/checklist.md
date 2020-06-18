# Checklist

## REST 기반의 API는 무엇인가요? 어떤 장점과 단점을 가지고 있을까요?

REST 기반의 API는 REST 아키텍쳐 규약을 접목한 웹 서비스 API입니다.

GET, PUT, POST, DELETE 같은 행동으로 컴퓨터 간 리소스를 주고 받는, 리소스 중심의 아키텍처입니다. 이때 라우트 주소는 정보를 나타내는 개념이 되는데, 각각의 라우트로 정보를 요청하면 그에 따른 응답값을 반환합니다.

예를들어 아래와 같은 형태입니다.

``` bash
/api/city/asia
/api/topics/welcome-to-korea
```

라우트는 데이터 모델의 엔드포인트가 됩니다. 개발자는 의도대로 엔드포인트를 다양하게 만들 수 있습니다. 그리고 일반적으로 라우트명을 읽고 어떤 자원인지 쉽게 유추할 수 있기 때문에, 의도하는 바를 파악하기 쉽습니다.

특성상 HTTP 인프라를 적극 활용하고, 이로 인한 장점이 있습니다.

1. Stateless

   Stateless한 통신이기 때문에 해당 라우트와 메소드만 신경쓰면 됩니다. 어떤 상태정보도 따로 저장하고 관리하지 않기 때문에, 서버는 들어오는 요청만 처리하면 됩니다. 따라서 구현이 단순해지고 자유도가 높아집니다.

2. Cacheable

   HTTP를 활용한 방법이기 때문에, HTTP의 캐싱을 쉽게 적용할 수 있습니다. 자원을 효율적으로 활용하기 위해서 Last-Modified 태그나 E-Tag를 이용해서 캐싱을 구현합니다.

3. 계층형 구조

   REST 서버는 다중 계층으로 구성할 수 있어서, 보안이나 로드 밸런싱, 암호화 계층을 추가할 수 있습니다. 이런 부분은 개발에서의 유연성을 확장해줍니다.

4. Client - Server 구조

   REST 서버는 API를 제공하고 클라이언트는 해당 리소스를 활용하는 식으로 각각의 역할이 구분되기 때문에, 개발할 내용이 명확해지고 의존성이 줄어듭니다.

반대로 이런  특성이 가지는 한계점도 있습니다. 크게 나누자면 자원의 요청과 응답, 엔드포인트 관리입니다.

REST API에서는 특정 엔드포인트에 대한 응답, 즉 데이터 구조가 서버측에서 이미 정의되어 있습니다. 그래서 요청과 응답 관점에서 오버패칭과 언더패칭 문제가 발생합니다.

먼저 **오버패칭**입니다.

예를들어 기술스택과 그 기술스택을 사용하는 회사 리스트를 포함하고 있는 데이터가 있다고 가정해보겠습니다.

``` json
{
  "_id": "~~~",
  "name": "Vue.js",
  "description": "JavaScript Framework ~~",
  "companies": [
    "Knowre",
    "Gitlab",
    "~~~"
  ],
}
```

이때 해당 기술을 사용하고 있는 회사 목록은 제외하고, 단순히 이름과 설명만 화면에 표시하고 싶습니다. 하지만 엔드포인트에서는 이미 companies까지 반환하게 되어 있으므로, 이 데이터까지 강제적으로 받아야만 합니다. 그리고 상기의 데이터에서 companies가 가장 많은 데이터를 포함할 확률이 높을 것 같습니다. 실제로 여러 데이터가 이런식으로 구성되어 있고, 같은 상황을 겪게될 수도 있습니다. 그리고 그만큼 속도 상의 손실이 발생합니다.

다음은 **언더패칭**입니다.

예를들어 상기의 기술 데이터에 해당 기술을 좋아하는 유저 등, 하나의 페이지를 완성하기 위해 다른 데이터의 요청이 필요한 경우가 있을 수 있습니다. 이런 데이터가 여러가지일 경우, 한 페이지를 온전하게 구성하기 위해서 여러번의 요청을 해야합니다. 만약 추가적으로 불러와야 하는 요청이, 상기의 오버패칭도 포함하고 있는 경우라면, 사용자가 해당 데이터를 보기까지의 시간이 더욱 길어질 수 있습니다.

마지막은 상기의 관점과 연관이 있는 **엔드포인트 관리**입니다.

위에서 보다시피, 클라이언트에 변경 사항이 생기면 새로운 엔드포인트를 만들어줘야 합니다. 그리고 이 엔드포인트를 만드려고 클라이언트와 백엔드 간에 의사소통이 필요해지고, 이에 따라 개발 기간도 얼마든지 늘어날 수 있습니다.



## GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

GraphQL API는 GraphQL이라는 쿼리 언어 명세를 바탕으로 작성한 API 입니다. GraphQL은 오버패칭과 언더패칭, 엔드포인트 관리 문제를 보완해 줄 수 있습니다.

**오버패칭 문제부터 보겠습니다.**

위 예시를 다시 가져와보겠습니다.

``` json
{
  "_id": "~~~",
  "name": "Vue.js",
  "description": "JavaScript Framework ~~",
  "companies": [
    "Knowre",
    "Gitlab",
    "~~~"
  ],
}
```

위에서는 id 값으로 해당 데이터를 전부 받아왔다면, GraphQL에서는 원하는 정보만 받아올 수 있습니다.

``` javascript
query {
  getTargetStack(
  	id: "~~~~"
  ) {
    name
    description
  }
}
```

상기와 같은 형식으로 쿼리문을 작성해주면 해당 id를 가진 정보의 name과 description만 응답값으로 받을 수 있게됩니다. 이렇게 하면 오버패칭 문제를 해결할 수 있습니다.

**다음은 언더패칭입니다.** 영화 배우의 정보와, 해당 영화 배우가 출연한 영화 정보를 가져오고 싶다고 가정해보겠습니다. 그리고 영화 정보는 다른 객체에 담겨 있습니다. REST API로 요청할 경우에는 해당 영화 배우에 대한 요청을 보내서 정보를 받은 다음, 배우가 출연한 영화에 대한 요청을 또 계속 보내야 합니다.

GraphQL을 사용하면 이런 요청을 한번에 처리할 수 있습니다.

``` 
query {
	actor(name: "John") {
		name
		height
		filmConnection {
			films {
				title
			}
		}
	}
}
```

요청 형태와 반환되는 데이터의 형태가 같아서 사용하기도 편리합니다.

그리고 **GraphQL은 단일 엔드포인트로 메시지**를 주고 받기 때문에, 사용자는 정의된 스키마만 신경써서 메시지를 주고 받으면 됩니다.



## GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

GraphQL에서 스키마는 데이터의 타입과 형태를 정의하는 역할을 합니다. 클라이언트와 서버 간에 주고 받아야 할 데이터의 타입과 구성 요소, 구성 요소의 타입이 정의됩니다. 이런 타입들의 집합이 GraphQL에서의 스키마입니다.

백엔드에서는 스키마를 보고 어떤 데이터를 저장해야 하는지 알 수 있고, 프론트엔드는 요청할 수 있는 데이터가 어떤 것인지 알 수 있습니다.

기본적으로 아래와 같은 방법으로 정의합니다.

``` javascript
type Query {
  info: String!
  feed: [Link!]!
  link(id: ID!): Link
}

type Mutation {
  post(
  	url: String!,
    description: String!
  ): Link!
}
  
type Link {
  id: ID!
  description: String!
  url: String!
}
```

보통 쿼리는 객체 타입입니다. 위 예제에서 `type Link`라고 선언한 부분을 보겠습니다.

Link는 필드를 가진 객체  타입을 의미합니다. 객체 안에는 어떤 정보를 담고 있는지와 해당 정보가 어떤 타입인지를 가리킵니다.

Link 타입 안에는 id와 description, url이라는 값이 선언되어 있습니다. 각각의 필드가 어떤 타입인지를 정의한 부분인데, `!` 표시가 붙어있습니다. `!`는 해당 필드는 null 값이 들어올 수 없다는 의미입니다. 이 필드에 쿼리를 보낼때 항상 값이 들어와야 한다는 GraphQL과의 약속이라고 볼 수 있습니다.

그리고 똑같이 객체이긴 하지만 조금 특별한 타입인 Query와 Mutation이 있습니다. REST API에서 CRUD를 구현하기 위해 메서드를 정하는 것 처럼, GraphQL에서도 어떤 작업인지를 명시하는 의미로 사용합니다. (참고로 GraphQL은 HTTP를 이용할 때 모든 요청을 POST로 보냅니다)

그래서 실제로 쿼리를 보낼때, 해당 요청에 맞는 루트 필드를 지정하고 스키마에서 정의된 규약에 따라 요청을 보내게 됩니다. 가장 바깥 쪽에 Query와 Mutation이라고 정의해준 것만 다르고, 객체 타입이라는 사실과 필드를 작성하는 방법은 똑같습니다.

위에서 보는 것 처럼 GraphQL 객체 타입은 이름과 필드를 가집니다. 그런데 가끔 필드가 정말 구체적인 데이터를 가리켜야 하는 경우가 있습니다. 이런 경우를 가리키기 위한 타입을 Scalar type이라고 지칭합니다.

GraphQL은 기본적으로 아래와 같은 Scalar type을 가집니다.

- Int: 32bit의 정수입니다
- Float: 이중 정밀 부동 소수점 값입니다
- String: UTF-8 문자입니다
- Boolean: 참 혹은 거짓 값을 가리킵니다
- ID: 유니크한 식별자임을 가리킵니다



### node.js 상에서 GraphQL 서버를 실행하고 스키마를 정의하려면 어떻게 해야 하나요?

GraphQL은 일종의 명세입니다. GraphQL 서버를 Node.js 상에서 실행하려면, 해당 명세를 구현한 라이브러리를 이용해야 합니다.

이용할 수 있는 라이브러리는 가장 간단한 형태인 Graphql.js부터 여러 추상화된 기능을 제공하는 Graphql-yoga까지 다양하게 있습니다. 기본적으로 서버를 실행하기 위한 방법은 비슷합니다. 추상화된 GraphQL HTTP 메서드에 정의한 스키마와 리졸버를 파라미터로 넘깁니다.

graphql-yoga를 예시로 설명해보겠습니다. 라이브러리마다 세부적인 구현 방법은 약간씩 다를 수 있습니다.

``` js
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000'))

```

GraphQL에서 지원하는 SDL(Schema Definition Language)을 사용해서 스키마를 정의할 수 있습니다. 위 코드 상의 typeDefs 안에 SDL로 스키마를 정의합니다. 루트 타입인 Query에 대한 스키마를 정의합니다. hello란 필드가 String 값을 선택적으로 받도록 정의해주었습니다.

리졸버에서는 해당 쿼리를 보낼 때 어떤 값을 리턴하는지에 대해 정의해줍니다. 위에서는 hello 쿼리를 인자 없이 보냈을 때는 `Hello World`라는 값을 반환하도록, 인자를 주입하면 `Hello 해당인자` 를 반환하도록 되어 있습니다.

``` javascript
query {
  hello
}
```

실제로 이렇게 쿼리를 보냅니다. 중괄호 안에는 필요한 필드가 정의되어 있습니다. 중괄호를 묶인 블록은 셀렉션 세트 라고 부릅니다.

``` js
{
  "data": {
    "hello": "Hello World!"
  }
}
```

응답값으로는 상기와 같은 값이 반환됩니다.



## GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

`리졸버`는 특정 필드의 데이터를 반환하는 역할을 하는 함수입니다.

스키마가 사용할 수 있는 쿼리를 정의해 두고, 타입 간의 관계를 지정해두는 역할을 한다면, 정의된 관계를 바탕으로 데이터를 가져올 역할이 필요합니다. 이 데이터를 가져오는 일을 리졸버가 맡고 있습니다.

리졸버는 스키마에 정의된 타입과 형태에 따라 데이터를 반환합니다. 일반적으로 REST API에서 요청에 대한 로직을 작성했던 부분을, GraphQL API에서는 리졸버 함수에 작성하게 됩니다.

``` js
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}
```

스키마 예제중 상기의 부분이 리졸버 부분에 해당합니다. 객체 안에 루트 타입을 지정한 후, 스키마에 정의된 필드에 따른 반환 값을 정의해줍니다.

위 리졸버 안의 쿼리가 정상적으로 실행되려면, 스키마의 쿼리 타입 안에도 hello 필드에 대한 정의가 되어있어야 합니다. 그래서 스키마 예제에서는

``` js
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`
```

상기와 같이 hello 쿼리에 대한 정의를 해두었습니다.

해당 리졸버 함수를 이해하기 위해서, 리졸버 함수의 인자로 들어가는 값을 간략하게 보겠습니다.

첫 번째 인자로 해당 필드의 부모 리졸버 값, 두 번째는 인자, 세 번째는 쿼리에 대한 context입니다. 다시 상기 예제를 보면 첫 번째 값은 비워두고 두 번째로 인자로 넘긴 값을 받는 것을 볼 수 있습니다.

실제로 쿼리에서

``` js
query {
  hello (
  	name: "Eminem"
  )
}
```

이라고 보내면,

``` js
{
  "data": {
    "hello": "Hello Eminem"
  }
}
```

을 반환하게 됩니다.

context에서는 각각의 쿼리가 실행될 때 전역으로 공유할 수 있는 값을 받아올 수 있습니다. context는 스키마와 리졸버를 인자로 넘겨서 서버를 실행할 때, 같이 정의하게 됩니다. db나 서버의 req 등 필요한 데이터나 인증 정보를 리졸버 함수와 공유하기 위해 사용합니다.



### GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?

DataLoader는 애플리케이션의 데이터를 fetching 하는 레이어의 일부로 사용되는 도구입니다. 데이터베이스나 batching과 caching을 이용해서 웹 서비스 같은 다양한 원격 데이터 소스에 간단하고 일관된 API를 제공하기 위해 사용합니다.

일반적으로 GraphQL을 사용하다 발생할 수 있는 1 + N 문제를 1 + 1로 변환시켜주는 역할을 합니다.

N+1 문제는 1:N 관계를 가진 엔티티에서 1에 해당하는 N을 호출하려고 할 때 발생합니다.

`MovieDirector` 엔티티와 `Films` 엔티티가 있다고 가정해보겠습니다. 봉준호 감독이 있다면, 그의 작품으로 `'기생충', '옥자', '설국열차', ...` 등이 있을 수 있습니다. 그리고 이 관계는 `1:N`으로 정의할 수 있습니다.

이 상황에서 봉준호 감독과 그의 모든 작품을 조회하려고 하면 `Films`에 대한 조회 N과 봉준호 감독에 대한 조회 1만큼 쿼리가 실행되야 하기 때문에 N+1 문제라고 부릅니다.

위 상황을 GraphQL SDL로 작성해 보겠습니다.

``` js
type MovieDirector {
  id: ID!
  name: String!
  films: [Film!]!
}

type Film {
  id: ID!
  title: String!
}
  
type Query {
  movieDirectors: [MovieDirector!]!
}
```

``` js
query {
  movieDirectors {
    id
    name
    films (
    	title
    )
  }
}
```

films에 대해 여러 번의 요청을 보내게 되고, 이에 따라 성능 저하가 생기게 됩니다.

DataLoader는 batching 기능으로 이 문제를 해결합니다. 하나의 tick에서 실행된 data fetch 요청을 모아서 하나의 요청으로 실행하고 결과를 다시 재분배하는 형태를 가집니다.

데이터로더가 하는 일을 크게 나누면 아래와 같습니다.

1. 이벤트 루프에서 하나의 틱에 해당하는 키의 배열을 수집합니다.
2. 키를 모아서 한번에 데이터베이스에 요청합니다
3. 결과 값을 프로미스로 반환합니다

이 작업을 위해 간단한 예제를 보겠습니다.

``` js
const DataLoader = require('dataloader');

const fakeDB = [
    '기생충',
    '설국열차',
    '보보경심려',
    '마더',
    '옥자',
    '괴물',
];

const batchGetUserById = async (ids) => {
    console.log(`called once per click: ${ids}`);
    return ids.map(id => fakeDB[id - 1]);
};

const userLoader = new DataLoader(batchGetUserById);

```

먼저 키를 모아줄 batch 함수를 만들어야 합니다. 작성한 batch 함수는 현재 fakeDB에 있는 영화명을 반환합니다. 이제 키를 수집하려면 load 함수를 이용해야 합니다.

``` js
console.log('\nEvent Loop Tick 1');
userLoader.load(1);
userLoader.load(2).then(user => {
    console.log(`Here is the user: ${user}`);
});

setTimeout(() => {
    console.log('\nTick 2');
    userLoader.load(3);
    userLoader.load(4).then(user => {
        console.log(`Here is the user: ${user}`);
    });
}, 1000);

setTimeout(() => {
    console.log('\nTick 3');
    userLoader.load(5);
    userLoader.load(6).then(user => {
        console.log(`Here is the user: ${user}`);
    });
}, 2000);
```

총 세 번의 틱으로 나눠진 것을 볼 수 있습니다. 결과 값을 보면,

``` js
Event Loop Tick 1
called once per click: 1,2
Here is the user: 설국열차

Tick 2
called once per click: 3,4
Here is the user: 마더

Tick 3
called once per click: 5,6
Here is the user: 괴물
```

각각의 요청이 틱별로 모아져서 반환된 모습을 볼 수 있습니다.



GraphQL에서도 아래와 같은 형태를 통해 DataLoader를 사용할 수 있습니다.

``` js
const batchLoadFn = async (ids) => {
  const items = await item.find({})
  return ids.map(id => items.filter(item => item.id === id))
}

export const itemsLoader = () => new DataLoader(batchLoadFn)
```

추가한 batch 함수를 컨텍스트에 전달해줍니다.

``` js
const server = new GraphQLServer({
  ...,
  context: () => ({
  	loaders: {
      itemsLoader: itemsLoader()
    }
	})
})
```

리졸버에서 해당 컨텍스트에 담긴 로더를 호출합니다.

``` js
items: async (parent, args, context) => {
	return context.loaders.itemLoader.load(parent.id)
}
```

부모의 아이디 값을 전달해서 N에 해당하는 요청을 모아 반환해줍니다.



## 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

GraphQL 서버의 엔드포인트에 POST 메서드를 사용한 HTTP 요청을 보낼 수만 있다면, 어떤 방법이든지 사용이 가능합니다. 크게 보면 curl로 보낼 수도 있고, 브라우저에서 지원하는 HTTP 요청 API를 사용할 수도 있습니다. 그리고 현실적인 문제를 위해 몇 가지 기능이 추가된 Apollo나 Relay 같은 라이브러리를 사용해서 보낼 수도 있습니다. 



### Apollo Client의 장점은 무엇일까요?

Apollo는 GraphQL의 캐싱 문제를 보완해줍니다. 그리고 React 이외의 환경에서도 사용이 가능합니다.

REST API에서는 요청을 보낼 때 사용한 URL 하위에 응답 데이터를 캐싱합니다. 하지만 GraphQL은 엔드포인트가 하나기 때문에 각각의 데이터에 대한 캐싱 처리를 하기가 어렵습니다. 애플리케이션 내에서 효율성을 높이려면 캐싱을 할 수 있는 방법을 찾아야 하는데, 이 기능을 수행하는 것이 Apollo Client 입니다.

그리고 GraphQL이 페이스북에서 만들어서 그런지, 이런 문제를 Relay라는 라이브러리를 통해 해결했습니다. 다만 Relay는 React와 React Native 환경에서만 사용이 가능합니다. 다른 클라이언트에서도 사용 가능한 GraphQL Client 솔루션이 필요했고, 이 니즈가 아폴로 클라이언트가 나온 이유가 되었습니다.

이외에도 퍼포먼스적으로 최적화된 상태를 제공하고, 에러 관리나 페이지네이션, UI에 대한 여러 부분을 지원하고 있습니다.



### Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

자바스크립트의 HTTP 요청 라이브러리를 통해서도 보낼 수 있습니다. 정말 간단하게는 graphql 엔드포인트로 curl을 보내서 확인해볼 수 있습니다. GraphQL은 HTTP의 POST 메서드를 사용합니다.

``` bash
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{hello}" }' http://localhost:4000/
```

위에서 정의한 서버에 curl로 요청을 보내면,

``` bash
{"data":{"hello":"Hello World"}}%
```

상기와 같은 값을 반환합니다.

fetch api를 이용해서 요청을 보낼 수도 있습니다.

``` js
const query = `{
    hello
}`;
const url = 'http://localhost:4000';

const opt = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
};

fetch(url, opt)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
```

``` js
Object
	data
  	hello: "Hello World"
		__proto__
   __proto__
```

똑같이 url과 쿼리문을 지정하고 json 타입으로 POST 메서드를 보내면, 상기의 반환 값을 확인할 수 있습니다.

