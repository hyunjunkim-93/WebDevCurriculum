

# Checklist

## 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
`classList` api의 메서드를 이용해서 클래스를 추가하거나 삭제할 수 있습니다. classList는 element의 class에 접근할 수 있는 읽기 전용 프로퍼티입니다.

``` js
element.classList.add('className');
element.classList.remove('className');
```



### IE나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?

상기의 API는 IE10+에서 지원합니다. 만약 그 이전이나 지원하지 않는 브라우저라면 element의 className에 접근해서 string 형태로 추가해줘야 합니다.

``` js
element.className += ' className';
```

HTML에서 복수의 클래스를 정의하는 방식도 사이에 공백을 주기 때문에 className 프로퍼티를 이용해 접근하는 방법도 공백을 줘야만 합니다.

<br>



## 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

먼저 변수의 스코프는 변수에 접근할 수 있는 장소를 정의합니다. 풀어서 말하면 변수가 유효한 범위라고 할 수 있겠습니다.

변수의 스코프는 선언한 키워드에 따라 결정되는데, 크게 `function-scoped`인 var 선언과  `block-scoped`인 let, const 선언으로 나뉩니다.

var 선언은 `function-scoped`입니다.  예를들어서 변수가 함수의 시작에서 선언됐다면, 그 함수 내에서만 접근할 수 있습니다. 그리고 보통 함수가 종료되면 사라집니다. 함수의 실행 컨텍스트가 변수의 유효 범위가 되기 때문에, 함수 스코프라고 부릅니다. 스코프에 진입했을 때 새로운 변수명에 값을 매핑하면서 새 환경을 만듭니다.

여기서 특이한 점이 한 가지 있는데, 이 스코프는 중첩이 될 수 있습니다. 하나의 함수 스코프 내부에 여러개의 함수 스코프가 중첩돼 있는 경우, 중첩된 함수 스코프에서 바깥 함수 스코프의 변수에 접근을 할 수 있습니다. 

여기서 문제가 될만한 상황이 2가지 생깁니다.

첫 번째는 if문이나 for문의 block-scope에서 선언한 var 변수는 해당 block-scope의 함수 스코프 내 어디서든 접근할 수 있다는 점입니다.

아래의 코드를 보면 문제를 알 수 있습니다.

``` js
var myvar = "global;

function f() {
  console.log(myvar); // (*)
  
  if (true) {
    var myvar = "local"; // (**)
  }
  console.log(myvar);
}

> f();
// output: undefined
// output: local
```

위 코드에서 일어나는 일을 정리해보면, var 선언은 함수 스코프이기 때문에, `함수 f`에서 첫 번째 콘솔로그는 전역 컨텍스트에서 선언된 `myvar`를 호출하지 못합니다. 대신 undefined가 나오게 되는데, 이 부분은 if문과 관련이 있습니다.

앞서 언급했듯이 if문 안에서 선언한 `myvar`는 block-scoped가 아닌 function-scoped를 가지게 되고, 함수 f의 어디서든 접근이 가능합니다. 따라서 변수 선언도 호이스팅 규칙에 따라 함수 f의 최상단으로 끌어올려지게 됩니다. 다만 호이스팅의 특성상 변수 자체는 끌어올려졌지만, 값은 해당 구문에서 할당하기 때문에 undefined를 출력하게 됩니다.

마찬가지로 block-scoped가 아니기 때문에, if문 안의 변수 선언과 할당은 함수 내에서 선언하고 할당한 것으로 취급되고, 마지막 콘솔로그는 `local`을 출력하게 됩니다.



두 번째는 중첩된 함수 스코프에서의 접근과 관련된 `클로저`의 문제입니다. 자바스크립트의 스코프는 정적입니다. 내부 함수에서 외부의 함수에 선언한 변수에 접근하면, 접근하는 변수를 계속해서 참조하고 해당 변수는 메모리에 남아있게 됩니다.

아래와 같은 경우가 있습니다.

``` js
function f() {
  var x = 'abc';
  return function() {
    return x;
  }
}

var test = f();
test();
// output: abc
```

코드를 보면 함수 f가 반환하는 익명함수의 반환 값은 함수 f의 변수 x를 참조하고 있습니다. 내부의 익명함수는 자체로는 처리되지 못하고, 외부 함수의 x 값을 필요로 합니다. test()의 결과 값은 x에 할당된 값인 'abc'입니다. 이렇게 내부 함수가 외부 함수의 환경을 기억하는 현상을 클로저라고 말합니다. x는 메모리 상에 계속 남아있게 되는데, x에 대한 참조를 해제하고 싶다면, 간단하게 null을 할당해주면 됩니다.

단점으로는 환경을 공유한다는 특징때문에 예기치못한 결과를 야기할 수 있습니다. 아래의 코드를 보면 알 수 있습니다.

``` js
function f() {
  var arr = ['red', 'green', 'blue'];
  var result = [];
 	for (var i = 0; i < arr.length - 1; i += 1) {
    var func = function() {
      return arr[i];
    };
    result.push(func);
  }
  return result;
}

var test = f();
// [f, f]
test[0]();
// output: 'blue'
test[1]();
// output: 'blue'
```

var는 `function-scoped`기 때문에, for문 안에서의 var 선언은 사실상 함수 f 내에서 선언한 것으로 처리됩니다.

따라서 `i`값은 계속해서 증가된 채로 함수 f내에 남아있게 되고, 함수 f의 환경을 참조하는 test 안의 함수는 반복문이 종료된 후의 최종 평가 값인 2를 기억하고 있습니다.

그래서 배열에서 호출한 결과 값이 `'blue'`가 나오게 되는 것입니다. 

이 문제는 즉시실행함수로 해결할 수 있습니다. 즉시실행함수로 스코프 문제를 해결하는 코드를 보겠습니다.

``` js
function f() {
  var arr = ['red', 'green', 'blue'];
  var result = [];
  for (var i = 0; i < arr.length - 1; i += 1) {
    (function() {
      var color = arr[i];
      var func = function() {
        return color;
      };
      result.push(func);
    }());
  }
  return result;
}

var test = f();
test[0]();
// output: 'red'
test[1]();
// output: 'green'
```

즉시실행함수(IIFE)로 해결하는 방법은, var 선언이 `function-scoped`라는 특성을 이용해서 loop의 iteration 값인 i를 계속 새로운 환경에서 저장해주는 방법입니다.

위 코드에서는 i가 0일때의 값을 즉시실행함수 내부의 color라는 변수에 저장해주고, 그 값을 함수 func에서 참조하도록 만들어서 의도했던 환경을 기억시키는 방법입니다.



### `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?

이를 보완하는 개념으로 ES2015에서 `let`과 `const`가 등장합니다. let과 const 키워드는 맨 앞에 언급했던 `block-scoped`를 가집니다.

block-scoped를 가지기 때문에 블락 내에서 선언한 코드는 해당 블락 외의 환경에서 접근할 수 없습니다.

``` js
function func() {
  if (true) {
    let tmp = 'knowre';
  }
  console.log(tmp);
}

func();
// ReferenceError: tmp is not defined
```

다시 var 키워드를 살펴보면,

``` js
function func() {
  if (true) {
    var tmp = 'knowre';
  }
  console.log(tmp);
}

func();
// output: 'knowre'
```

function-scoped이기 때문에 블락 스코프 내에서 정의된 tmp의 값이 그대로 출력됩니다.

만약 함수 내에서 선언한 foo와 block-scoped 환경에서 선언한 foo를 콘솔로그로 찍어본다면, 각각 해당하는 생성 환경에서의 값을 출력합니다.

``` js
function func() {
  let name = 'knowre';
  if (true) {
    let name = 'knowre2';
    console.log(name);
  }
  console.log(name);
}

func();
// output: 'knowre2'
// output: 'knowre'
```

block-scoped 환경의 변수는 function-scoped 환경과 별개이기 때문에, 이전에 보았던 클로저 문제를 let으로 해결할 수 있습니다.

``` js
function f() {
  var arr = ['red', 'green', 'blue'];
	var result = [];
 	for (let i = 0; i < arr.length - 1; i += 1) {
    var func = function() {
      return arr[i];
    };
    result.push(func);
  }
  return result;
}

var test = f();
// [f, f]
test[0]();
// output: 'red'
test[1]();
// output: 'green'
```



<br>