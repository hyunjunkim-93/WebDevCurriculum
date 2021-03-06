# Checklist

## 자동화된 테스트를 만드는 것에는 어떤 장점과 단점이 있을까요?

자동화된 테스트는 안정성을 주지만, 그만큼 시간을 소모합니다.

**장점**

- 코드 작성이 완료된 경우, 수동으로 테스트 하는 것보다 처리가 빠릅니다
- 코드 상의 실수는 있어도, 그 외에 사람이 개입하지 않기 때문에 좀 더 신뢰 가능합니다
- 코드로 관리되기 때문에, 테스트 작성 비율이 높다면 테스트 결과를 효율적으로 관리할 수 있습니다
- 시간과 장소에 구애받지 않고 테스트가 가능합니다
- 배포 단계에 자동화 테스트를 넣음으로써, 제품의 안정성을 좀 더 보장받을 수 있습니다

**단점**

- 단순 작업일 경우 테스트 코드를 작성하는데 수동 테스트보다 시간이 더 많이 걸릴 수 있습니다
- 테스트 코드를 어떻게 작성했냐에 따라서, 테스트 코드에도 유지보수가 필요할 수 있습니다
- 기능이 변경되면 테스트 코드도 같이 변경되어야 합니다
- 실제 도메인에서 이뤄지는 사용자의 행동과 테스트 코드에서 보장하는 부분이 잘 맞지 않을 수 있습니다



### TDD(Test-Driven Development)란 무엇인가요? TDD의 장점과 단점은 무엇일까요?

TDD, 테스트 주도 개발은 기능 코드를 작성하기 전에 테스트 코드를 먼저 작성하는 방법입니다. 그리고 테스트 코드를 통과하기 위한 기능 코드를 작성하고, 기능 코드를 작성한 후 코드를 추상화하고 중복을 없애는 등 리팩토링 작업을 진행합니다.

TDD에서는 이 단계를 실패(Red) - 통과(Green) - 리팩터(Blue)의 세 단계로 나눕니다.

앞에서 언급했듯이 실패 단계는 테스트 코드를 작성하는 단계입니다. 기능 코드가 정의되어 있지 않기 때문에 무조건적으로 실패를 하게 됩니다.

테스트 할 대상에 대한 코드가 작성되면, 이제 직접적으로 동작하는 기능 코드를 작성합니다. 이때 기능 통과를 목표로 작성하고 이 단계를 거치면 리팩터 단계로 들어가게 됩니다.

리팩터 단계는 코드가 안전하다는 사실을 보장하는 단계입니다. 코드를 테스트하기 쉽게 만들고, 관심사를 분리합니다.



**장점**

1. 명세로서의 기능

   TDD 방법론을 사용해서 개발을 하면, 본격적인 코드를 작성하기 전에 어떤 기능을 개발해야 할지 개요가 잡힙니다. 이 개요는 기획 문서 상의 기능보다는, 그 기능을 실제 코드로 작성했을 때 무엇을, 어떻게 작성할지에 대한 부분을 명확히 해주는 코드를 의미합니다. 그 기능이 실제 코드상에서 어떤 일을 하도록 구현해야 하는지에 대해 단계적으로 짚어나가다 보니, 개발 단계에서의 집중력을 올려주고 추후에 어떤 일을 하는지 파악할 수 있는 명세로서 기능할 수 있습니다.

2. 빠른 피드백 주기

   TDD를 사용하게 되면, 작성한 코드에 대한 피드백 주기가 빨라집니다. 실패하고 통과하고를 반복해야 되고, 실제로 테스트 코드 작성이 쉬워질려면 함수가 간단하고 정확한 일을 하도록 작성되어야 합니다. 그래서 나눠진 함수의 동작을 재빠르게 확인할 수 있고, 이는 곧 디버깅 시간이 짧아짐을 의미합니다.

3. 리팩토링시 안정성

   TDD 방법론을 사용해서 주요 로직에 대한 테스트 코드가 모두 작성되었다면, 추후 리팩토링시 작업이 편리해집니다. 리팩토링 대상 코드의 결과를 테스트 코드에서 보장하고 있으니, 작업자는 리팩토링을 하면서 해당 테스트 코드를 통과하도록만 작성하는데 집중하면 됩니다. 테스트 코드가 없는 경우에는, 갑자기 예외 케이스를 맞이할 수도 있습니다. 물론 테스트 코드 자체가 잘 작성되는게 전제 조건입니다.

4. 코드의 퀄리티 향상

   위에서도 언급했듯이, 함수의 크기가 작아지고 그 일이 명료해질수록 테스트가 쉬워집니다. 결국은 테스트를 통과하기 위해서 코드가 점점 깔끔해지고 단순해집니다. 결론적으로는 기능 코드가 전체적으로 의존성이 적고 본래의 목적에 맞는 일을 하도록  구성 됩니다.

**단점**

1. 초기 적응 비용 발생

   TDD는 일반적으로 실제 사용할 때 익숙하지 않은 개발 방법론입니다. 기능 코드를 작성하기 전에 테스트 코드를 작성하는 습관을 들이기까지 많은 시간이 소요될 수 있습니다. 구성원이 익숙하지 않은채로 개발이 진행된다면, 프로덕트의 개발 속도가 훨씬 느려지게 될 수 있습니다.

2. 주객전도 가능성

   테스트는 테스트일뿐 가장 중요한 것은 실제 코드인데, 테스트 코드를 작성하는데에 너무 매몰될 수도 있습니다. TDD로 프로젝트를 진행하게 되면 적용하기 어려운 예외가 생길 수 있는데, 이때 원칙대로 할지 안할지에 대한 고민에 많은 시간을 소요하게 될 수도 있습니다.

3. 코드 작성량 증가로 인한 시간 소모

   본질적으로 코드의 양이 증가하는 것은 맞기 때문에, 초기에는 더 많은 시간이 소요될 수 있습니다. 물론 나중에 테스트 코드를 유지보수 하면서도 해당 문제가 발생할 수 있습니다. TDD나 테스트 코드 작성으로 시간을 줄일 수 있는 부분은 제품 출시 후의 라이프사이클 동안에 생기는데, 안정성이나 개발자 개인의 코드 작성 속도 등, 증명하기 어려운 부분입니다. 그래서 구성원에게 필요성을 증명하기 어렵습니다.



## 테스트들 간의 계층에 따라 어떤 단계들이 있을까요?

### 유닛 테스트, 통합 테스트, E2E 테스트는 각각 어떤 것을 뜻하나요?

테스트는 크게 유닛 테스트, 통합 테스트, E2E 테스트로 나뉩니다.

- 유닛 테스트

  유닛 테스트는 가장 작은 단위의 기능을 테스트 하는 방법입니다. 보통은 함수나 메서드의 동작을 확인합니다. 대부분의 중요한 기능은 함수 단위로 동작하게 됩니다. 이 함수 하나하나의 이상여부를 확인하면, 프로그램의 안정성이 훨씬 높아질 수 있습니다. 함수 하나 하나의 동작이 보장된다면, 다른 함수와 관계를 가지게 되더라도 안전하게 작동한다는 사실을 보장할 수 있습니다.

  다만 하나의 함수로는 이상이 없더라도, 모든 함수의 테스트 코드를 작성한 게 아니라면 실질적으로 더 큰 단위의 이상 여부를 보증할 수는 없습니다. 다른 함수와 연쇄적으로 작용하게 될 때 이상이 생길 수 있는 점도 염려해두어야 합니다. 그리고 실제로는 의존 관계가 복잡하게 형성될 가능성도 다분하기 때문에, 중간에 단위 테스트 코드를 작성하는 경우 시간이 많이 소모될 수도 있습니다. 의존 관계를 파악해서 줄이고 나눠야 하기 때문입니다.

- 통합 테스트

  단위로 구분한 여러 모듈들이 결속 됐을때 정상적으로 동작하는지를 검증하려고 사용합니다. 앞에서 언급했다시피 실제로는 어떻게 구성될지 보장하기 어렵고, 여러 의존성이 있을 수 있습니다. 이에 대비해서 단위가 통합된 모듈을 테스트 하는데 초점을 맞춥니다. 보통은 인터페이스나 데이터의 흐름에 초점을 맞춰서 테스트 합니다.

  단점으로는 테스트의 시작 단위가 통합 모듈이 완성되었을 때라는 점입니다. 그리고 여러 단위 모듈을 한 번에 테스트하기 때문에, 문제가 생겼을 때 어떤 부분의 이상인지 확인하기 어렵습니다. 마찬가지로 각각의 함수가 테스트 된 것이 아니기 때문에, 안정성을 보장하기도 어렵습니다.

- E2E Test

  E2E 테스트는 사용자의 입장에서 테스트 하는 방법입니다. 이전의 테스트 방법과 다르게 GUI를 통한 시나리오나 기능을 테스트 합니다. 예를들어 노트를 추가하는 기능을 테스트 한다면, 사용자가 새로운 노트를 추가했을 때 화면상에 실제로 새로운 노트가 추가 되는가를 확인하는 경우가 있습니다.

  실질적으로 유저의 행동을 테스트 하는 방법이기 때문에 사용자의 경험을 확인하고 이상이 없는지 검증하기 쉽습니다. 그리고 결국은 종단에서 이상이 없는지 검증하는 게 사용자 입장에서는 가장 중요하기 때문에, 그 의미가 더욱 큰 테스트라고 볼 수 있습니다.

  다만 E2E 테스팅 툴은 GUI를 테스트 하는 만큼 느리고 기능적으로 부족한 부분이 많습니다. 보통은 브라우저 환경에서 확인하기 때문에, 브라우저 마다 지원 여부가 다를 수도 있고, 어떤 기능은 동작하지 않을 수도 있습니다. 그래서 사용하는 기술 스택과 환경에 맞는 E2E 테스팅 툴을 선택해야만 합니다.

  

### 테스트에 있어서 Stub과 Mock은 어떤 개념을 가리키는 것일까요?

Stub과 Mock 모두 테스트에서 필요한 실제 데이터를 대신하여 사용하는 방법입니다. 이런 방법을 보통 테스트 더블이라고 부릅니다.

Stub은 미리 결과가 정해진 데이터입니다. 미리 정해진 결과 외에는 어떤 다른 값으로도 응답하지 않습니다. 보통은 상태를 검증하기 위해 사용합니다.

Mock은 행위를 검증하기 위해 사용합니다. 행위 기반이라는 의미는 로직이 포함되어 있을 수 있고, 복잡도도 그만큼 올라가기 때문에 가능하다면 Stub을 사용하는 게 좋습니다.



## Jest는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

Jest는 자바스크립트 코드를 테스트하는 도구입니다.

여타의 테스트 도구와 같이 테스트를 도와주는 여러 API를 제공하고 있습니다.

Jest에서 주장하는 특징은 4가지 입니다.

- zero config

  설치만 하면 따로 설정할 게 없습니다

- snapshot

  테스트의 환경을 저장하는 기능입니다. 결과 값을 파일로 저장해서, 테스트 할 때 마다 테스트 결과 값을 비교합니다

- isolated

  병렬화로 처리 성능을 극대화 했습니다

- great API

  문서화와 관리가 잘 되어있습니다



기본적으로는 행동을 정의하고 예상 값과 비교해서 테스트 결과를 알려줍니다.

``` bash
yarn add --dev jest
```

간단하게 jest를 추가하면 바로 사용할 수 있습니다.

``` js
function sum(a, b) {
  return a + b;
};
```

sum 이라는 두 인자의 합을 반환해주는 함수가 있다고 가정하겠습니다.

``` js
describe('sum은', () => {
	it('인자로 받은 두 수의 합을 반환한다', () => {
    expect(sum(1, 2).toBe(3))
  })
})
```

sum이라는 함수는 인자로 받은 두 수, 1과 2의 합인 3을 반환할 것으로 예상합니다.

이때 파일 이름은 `sum.test.js` 입니다. jest는 test가 붙은 파일을 찾아서 자동으로 테스트를 실행시켜 줍니다.

혹은 `package.json`에서

``` json
{
  "scripts": {
    "test": "jest"
  }
}
```

라고 입력후 `npm run test`를 실행하면 jest의 실행 결과를 볼 수 있습니다.

``` js
PASS  ./sum.test.js
✓ '인자로 받은 두 수의 합을 반환한다' (5ms)
```

값을 테스트 해주는 여러가지 Matchers를 제공합니다. 그래서 값이 배열 혹은 객체거나 불리언 값이라면 `toBeTruthy` 등 상황에 맞는 Matchers를 사용해야 합니다.

이 외에 snapshot이나 mock 관련 API 등 다양한 기능을 포함하고 있습니다.



### Jest 이외의 테스트 프레임워크는 어떤 것이 있고 어떤 장단점이 있을까요?

- **Jasmine**
  - 장점
    - 클라이언트와 서버 양쪽에서 사용 가능
    - TDD 보다는 BDD의 개념에 입각하여 만들어진 프레임워크 (경우에 따라 단점이기도 합니다)
  - 단점
    - 테스트 러너를 제공하지 않음
- **Mocha**
  - 장점
    - 유연함 (다른 라이브러리와 사용 가능성 높음)
    - 테스트 실행이 비교적 빠른편
  - 단점

    - 스냅샷 테스트를 지원하지 않음
    - 코드 커버리지를 기본 옵션으로 제공하지 않음
- Karma
  - 장점
    - 실제 브라우저에서 테스트를 실행 가능
    - 다른 테스팅 프레임워크와 연동 가능 (테스트 러너이기 때문)
    - 구글 크롬으로 디버깅 가능
  - 단점
    - 단위 테스트 등을 하려면 다른 테스팅 프레임워크와의 연동이 필수적

## Puppeteer는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

Puppeteer는 Devtools Protocol을 통해서 Chrome이나 Chromium을 제어하기 위한 API를 제공하는 Node 기반 라이브러리입니다.

주요한 기능은 아래와 같습니다

- jest와 연동해서 브라우저 혹은 cli 상에서 자동화 테스트가 가능합니다
- 브라우저에 접근해서 입력을 제어할 수 있습니다 (UI 테스팅이 가능합니다)
- 웹페이지를 크롤링 할 수 있습니다
- 내장 메서드로 접속한 페이지의 스크린샷을 찍거나 PDF로 만들 수 있습니다



공식 문서의 스크린샷을 찍는 예제를 한번 보겠습니다.

``` js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

브라우저를 열고 `https://example.com` 로 가서 해당 페이지의 스크린샷을 찍는 코드입니다. 루트 경로에 `example.png` 라는 이름으로 스크린샷이 저장됩니다. 각각의 API는 async/await으로 처리해줘야 합니다.

이런 점을 활용해 jest와 연동해서 사용할 수 있습니다.

``` bash
yarn add jest jest-puppeteer
```

`jest-puppeteer`를 설치하고  test 파일을 추가해줍니다. `jest-puppeteer.config.js`을 추가하고 옵션을 설정할 수도 있습니다.

실제로 로그인 하는 테스트 파일 예제를 보겠습니다.

``` js
describe('로그인', () => {
    it('로그인에 성공하면 기본 페이지로 이동한다', async () => {
        const id = 'testuser';
        const pw = '123';

        await page.type('#signin-input--id', id);
        await page.type('#signin-input--password', pw);
        await page.screenshot({ path: './src/test/screenshot/loginFillView.png' });
        await Promise.all([page.click('#signin-btn--login'), page.waitForNavigation()]);
        const result = page.url();
        const expected = 'http://localhost:8080/';
        expect(result).toBe(expected);
    })
})
```

로그인 페이지에서 아이디와 비밀번호란을 id 셀렉터를 이용해서 접근합니다. 그리고 puppeteer에서 제공하는 type 메서드로 정보를 입력하고,  click 메서드로 버튼을 클릭해 로그인을 시도할 수 있습니다.

그리고 로그인 정보가 입력된 UI를 screenshot 메서드를 통해 저장할 수 있습니다. 로그인이 성공하면 `'/'`루트로 이동하게 되는데, 이를 확인하기 위해 url 정보를 가져오고, jest의 expect 메서드로 url이 알맞은지 확인합니다.

이렇게 jest와 연동해서 UI를 조작하거나 UI에 렌더된 값을 가져와서 테스트를 시도할 수 있습니다.

