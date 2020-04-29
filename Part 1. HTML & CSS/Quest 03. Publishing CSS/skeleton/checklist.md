# Checklist

## CSS 퍼블리싱을 할 때, class와 selector들은 어떤 식으로 정리하는 것이 좋을까요?

CSS 퍼블리싱에서 규모가 커지거나 가독성을 향상시킬 수 있는 몇 가지 방법이 있습니다.

- 먼저 공통적으로 쓰이는 selector와 개별 요소에 적용되는 selector를 구분하여 작성합니다. css를 모듈로 나눌 수 있는 경우 목적에 맞게 개별 CSS를 생성하여 작업하고 그렇지 않다면 주석 처리로 해당 코드는 어떤 부분을 담는지 명시해줍니다

- 각 클래스 명은 일정한 규칙을 띄고 있는 것이 좋습니다. BEM 같은 네이밍 방법으로 태그별 class를 작성해서 위치와 상관없이 요소를 선택하여 작성할 수 있습니다. 해당 클래스가 어떤 부분을 맡고 있는지 쉽게 파악할 수 있도록 최대한 명확하게 이름을 짓습니다.

- nht-child 같이 특정 태그를 순서를 기준으로 선택하는 태그는 최대한 사용을 지양합니다. 요구사항이 언제 변할지 알 수 없기 때문에, 다른 태그와의 의존성을 최대한 줄여주는 것이 좋습니다.

- 공통 요소는 중복을 최대한 줄여주는 게 좋습니다. 예를들어 공통적으로 많이 사용하는 색상은 class로 지정하여 사용하는 것이 좋습니다. 색상에 대한 요구사항 변경이 있을 경우, 전체를 일일이 수정하지 않고 유연하게 대처 가능합니다.