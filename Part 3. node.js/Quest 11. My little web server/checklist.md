# Checklist

## HTTP의 GET과 POST 메서드는 어떻게 다른가요?

`GET`과 `POST`는 멱등성의 여부와 요청하는 데이터를 보내는 방법이 다릅니다.

먼저 `GET` 메서드는 서버에 특정 자원을 요청하는데 사용됩니다. 같은 요청에 대해서 항상 같은 값을 반환하기 때문에 멱등성을 가집니다. GET 메서드는 요청 데이터를 Header의 URL에 담아서 전송합니다. URL은 데이터 크기가 한정적이기 때문에, 요청 데이터의 크기 또한 제한적입니다. 그리고 URL은 브라우저의 주소 입력창에 드러나기 때문에 보안에 민감한 데이터는 GET 메서드로 요청하지 않는 게 좋습니다.

해당 요청에 대한 필요 데이터는 URL의 끝에 '?'를 붙이고 키와 벨류의 형태로 이루어진 `쿼리 스트링`을 통해 이루어집니다.

`POST` 메서드는 요청 메시지를 Body에 담아서 보냅니다. 그래서 데이터 크기 제약에서 비교적 자유롭고, 파일 등을 첨부해서 보낼 수도 있습니다. 명시적으로 URL에 요청 데이터에 대한 정보가 보이지는 않지만, GET과 똑같이 평문으로 보내지기 때문에 사실상 큰 차이가 없습니다. 일반적으로 서버에 데이터를 보내 자원을 생성하거나 업데이트 하는 목적으로 사용합니다. 서버의 자원을 생성하거나 업데이트 하기 때문에, 멱등성을 보장할 수 없습니다.



### 다른 HTTP 메소드에는 무엇이 있나요?

이 외에 PUT, PATCH, DELETE, TRACE 등의 메서드가 있습니다.

`PUT`은 POST와 비슷하게 생성과 업데이트의 기능을 수행하는 메서드입니다. 클라이언트에서 PUT 요청에 대한 자원의 식별자를 새로 지정하는 경우에, PUT 요청은 해당 URL에 대한 자원을 새로 만듭니다. 혹은 이미 자원의 URL을 아는 상태에서 요청할 경우 해당 URL의 기존 자원을 요청에 포함된 자원으로 교체합니다. 이 경우에 업데이트 기능을 수행한다고 볼 수 있습니다. 일반적으로 PUT 메서드는 URL의 기존 자원을 교체하는데 주로 사용됩니다. PUT의 경우에도 해당 URL에 대한 식별자가 있어야지 새로 생성하거나 교체하고, 요청하는 정보가 같다면, 같은 값을 반환하므로 멱등하다고 할 수 있습니다.

`PATCH` 메서드도 비슷하게 업데이트의 기능을 수행합니다. 다만 PATCH 메서드는 교체의 개념이 아니라 달라진 일부를 변경한다는 의미를 지닙니다. PUT에서는 보낸 필드 이외에는 `null`이나 초기화 처리가 되지만, PATCH는 일부분을 보내도, 해당 필드만 수정됩니다. 그래서 PUT과 다르게 멱등성을 보장하지 않습니다.

`DELETE`는 origin 서버에 특정 자원의 삭제를 요청하는 메서드 입니다. 다만 클라이언트는 해당 작업이 수행됐음을 보장받지는 못합니다. 삭제 요청에 대해 항상 같은 결과를 반환하기 때문에 멱등성을 보장합니다.

`TRACE`는 클라이언트의 요청이 서버에 도달했을 때, 어떻게 보이는지를 알려줍니다. 그리고 자기 앞으로 요청 메시지를 반환해서 요청 리소스가 수신되는 경로를 보여줍니다. 서버로의 요청이 의도한대로 동작하는지 검사하는 디버깅 용도로 사용할 수 있습니다. 그렇지만 XSS의 취약성을 바탕으로 TRACE 메서드를 조합하면, 해당 서버의 정보를 볼 수 있어서 의도적으로 활성화를 막아두는 경우가 있습니다.

`OPTIONS`는 웹 서버측에서 어떤 메서드를 허락하는지에 대해 알려주는 역할을 합니다. 요청 메서드가 허용되지 않을 경우 '405 Method Not Allowed'를 보냅니다. 요청 URI가 *면 OPTIONS 요청은 특정 자원이라기 보다는 전체 서버를 나타내고, *가 아니면 특정 자원과 커뮤니케이션 할 때 필요한 옵션이 적용됩니다.

`HEAD`는 실제 문서가 아니라 문서의 정보를 요청하는 메서드입니다. 그래서 응답 값에 body를 가지지 않습니다. HEAD 요청을 보냈는데 어떤 GET 요청 후의 캐시 리소스가 만료된 것을 알게되면, GET 요청을 하지 않았어도 해당 캐시는 무효 처리됩니다. 단순히 자료의 메타데이터가 필요한 경우에는 GET보다 HEAD 메서드를 쓰는게 적절합니다.




## HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?

HTML의 form 타입은 GET과 POST 요청을 지원합니다. form의 메서드 속성에 원하는 HTTP 메서드 타입을 지정해주고 제출하게 되면, 해당 메서드 타입으로 요청이 전송됩니다. 이때 요청 정보는 GET의 경우 Header의 URL에 `?key=value` 형태로 요청 정보가 붙어서 전송되고, POST의 경우 Body를 통해 전송됩니다. form 데이터의 내용을 인코딩 해야 하는 경우, 3가지 옵션 중 선택할 수 있습니다. `application/x-www-form-urlencoded`가 기본 상태고, 타입에 따라 `multipart/form-data`나 `text/plain`으로 인코딩합니다.

이 외에 XMLHttpRequest라는 내장 객체를 사용해서 서버에 HTTP 요청을 보낼 수 있습니다. 이 내장 객체는 여러 메서드를 포함하고 있는데, 해당 메서드에 원하는 URL과 HTTP 메서드, 데이터를 담아서 요청할 수 있습니다.



### HTTP 요청의 `Content-Type` 헤더는 무엇인가요?

Content-Type은 Request에 실어 보내는 데이터의 타입을 지정해주는 헤더입니다. 몇몇 경우에는 브라우저가 이 타입을 임의로 추정하고, 내려온 값을 따르지 않을 수도 있습니다. 그래서 header의 `X-Content-Type-Options`에서 `nosniff` 옵션을 설정해줘서 추정해서 결정하는 일을 막아줄 수 있습니다.

### Postman에서 POST 요청을 보내는 여러 가지 방법(`form-data`, `x-www-form-urlencoded`, `raw`, `binary`) 각각은 어떤 용도를 가지고 있나요?

`form-data`는 키와 벨류의 쌍으로 데이터를 설정해서 보냅니다. 파일을 첨부하는 용도로 많이 사용합니다. form 태그에서 이 타입으로 인코딩 하지 않으면, POST 메서드로 파일을 보낼 수 없습니다. 히스토리나 컬렉션에 파일이 저장되지 않기 때문에, 요청을 다시 할 때는 파일을 다시 선택해야만 합니다.

`x-www-form-urlencoded`는 HTML의 Form 태그에서 post로 제출할 때 기본이 되는 인코딩 타입입니다. 데이터는 키와 벨류의 한 쌍으로 이루어져 있고, &를 사용해서 여러개의 데이터를 묶어줄 수 있습니다. GET 메서드 요청의 param과 비슷한 형태입니다.

`raw`는 데이터 타입에 대한 수정 없이 문자열 그대로 데이터를 보내는 방법입니다. plain-text나 JSON 등 기본적인 string 형태로 보내고 싶을때 사용합니다.

`Binary`는 이진수인 데이터 파일을 보낼 때 사용합니다. 포스트맨에 들어가지 않는 데이터를 보낼 수 있도록 해줍니다. 이미지나 오디오, 비디오 파일을 보낼때 많이 사용하고, 텍스트 파일도 보낼 수 있습니다.

