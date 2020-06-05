# Checklist

## Vue.js는 어떤 특징을 가지고 있는 웹 프레임워크인가요?
Vue.js는 반응형 패러다임을 가 웹 프레임워크입니다. 기본적으로 애플리케이션의 상태 변화를 관찰하고, 변화가 있을 경우 알림을 전달해서 뷰를 자동으로 렌더링합니다.

Vue.js의 특징이라고 일컫는 것들은 아래와 같습니다.

1. CDN을 통해 기존 프로젝트에 점진적인 도입이 가능하다
2. 재사용이 가능한 컴포넌트 파일로 앱을 구성할 수 있다
3. HTML, CSS, JS를 한 컴포넌트에서 관리하는 방식으로 사용 가능하다
4. 컴포넌트의 틀과 문법이 일반적으로 사용하는 HTML, CSS, JS와 크게 다르지 않아서 쉽게 적응할 수 있다
5. 양방향으로 데이터 바인딩과 컴포넌트 간 바인딩을 제공한다
6. 상태 관리나 애플리케이션 개발을 위해 필요한 공식 라이브러리가 정해져있다

위 특징은 리액트나 앵귤러도 비슷하고, 라이브러리로 그 차이를 줄이는 게 가능합니다.

그래서 제가 생각했을 때 가장 큰 차이는 프레임워크의 구성 환경과 한 컴포넌트에서 HTML, CSS, JS를 관리하는 방식입니다.

먼저 Vue는 리액트와 앵귤러의 중간 포지션같은 느낌입니다.

리액트는 UI 컴포넌트에 관한 기능만 제공하기 때문에, 다른 라이브러리가 필수적인데, 선택권이 너무 넓고 그만큼 문제도 가지각각 일어난다는 점입니다.

앵귤러는 모두 같은 시스템을 사용하기 때문에 사용자 모두가 같은 문제를 겪고, 어떤 라이브러리를 사용해야할지 고민할 필요가 없습니다.

반면 Vue는 앵귤러보다는 자유롭지만, 기본적으로 공식 지정된 라이브러리들이 존재합니다.

그리고 라이브러리를 배제한다면, 기본적으로 Vue는 HTML, CSS, JS를 한 컴포넌트에서 관리하는 방식을 권하고 있습니다.

리액트의 경우 JSX로 HTML을 컨트롤하고 CSS 같은 경우 라이브러리를 사용하지 않는다면 별도의 파일로 관리합니다.

앵귤러의 경우도 HTML, CSS, JS를 전부 분리해서 개발하는게 기본입니다.

이 부분에서 사용자가 비교적 쉽게 Vue에 적응할 수 있고, HTML, CSS, JS라는 기술적 분리가 아니라 해당 컴포넌트의 UI 로직에만 집중해서 사고할 수 있도록 도와주고 있습니다.



## Vue.js에서의 컴포넌트란 무엇인가요?
컴포넌트는 고유한 이름을 가지고 있고 재사용 가능한 인스턴스입니다. Vue에서 제공해주는 컴포넌트는 미리 정의된 옵션을 가지고 있습니다. el과 같은 루트에서 제공하는 옵션을 제외하고는 생성자로 생성한 인스턴스와 동일한 옵션을 가지고 있습니다.

컴포넌트를 통해 코드를 작은 부분으로 나눌 수 있기 때문에, 반복되는 부분은 기존 컴포넌트를 재사용해서 전체적인 코드의 양을 줄일 수 있습니다. 그리고 필요한 데이터는 부모 컴포넌트로부터 주입받는 등의 방식으로 재사용성을 더욱 높일 수 있습니다.



## 컴포넌트 간에 데이터를 주고받을 때 단방향 바인딩과 양방향 바인딩 방식이 어떻게 다르고, 어떤 장단점을 가지고 있나요?
단방향 바인딩은 데이터의 흐름이 한쪽에서 다른 한쪽으로 일정하게 흐르는 것입니다. Vue에서는 보통 부모-자식 컴포넌트 간의 관계로, 부모 컴포넌트에서 자식 컴포넌트로 값을 내려줄 수 있는 props 옵션을 사용합니다. 데이터의 흐름이 비교적 단순하기 때문에 앱이 커지더라도 유지보수 하기가 수월해집니다.

대신 불가피하게 컴포넌트 간의 데이터가 동기화 되야 하는 경우, 작업해야할 코드량이 늘어납니다. 혹은 별도로 상태를 관리하는 코드가 있어야만 합니다.

이와 다르게 양방향 바인딩은 한쪽에서 데이터의 변경이 일어나면 나머지 컴포넌트도 동일하게 변경이 일어나는 방식입니다. 일반적으로 부모 컴포넌트에서 props로 상태 값을 전달하면 자식 컴포넌트에서는 이벤트를 발생시키고, 이를 다시 부모 컴포넌트에서 감지해 props로 전달 해준 값을 변경하는 방식입니다.

컴포넌트 간에 데이터를 주고 받기 훨씬 수월해지지만, 코드의 규모가 늘어나면 이렇게 양방향 바인딩 방식으로 작성된 코드를 읽어나가기 점점 어려워지고, 관리하기가 힘들어지게 됩니다.


