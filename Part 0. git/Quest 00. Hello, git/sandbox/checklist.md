# Checklist

## 1. 버전 관리 시스템은 왜 필요한가요?

**버전 관리 시스템**은 소스 코드의 관리를 용이하게 만들어 줍니다. 특히 회사 내 작업이 대부분 팀 작업임을 감안했을 때, 안정성을 높여주는 역할을 합니다.

1. 각 팀원이 수정한 부분을 팀원 전체가 동기화 하는 과정을 자동화 시켜줍니다.
2. branch 기능으로 프로젝트에 영향을 최소화 하면서 새로운 부분을 개발할 수 있습니다.
3. 소스 코드의 변경 사항과 작성자 및 작성 의도를 추적할 수 있습니다.
4. 작업에 실수가 있었을 때 특정 시점으로 내용을 복구할 수 있습니다.

상기의 관점에서 버전 관리 시스템은 개발자의 자산인 소스 코드를 안전하고 효율적으로 관리하도록 도와줍니다.

<br>

## 2. git 외의 버전관리 시스템에는 무엇이 있나요? git은 그 시스템과 어떤 점이 다르며, 어떤 장점을 가지고 있나요?

분산 버전 관리 시스템에 속하는 Git과 다르게 집중식 버전 관리 시스템을 대표하는 SVN이 있습니다.

Git과 SVN은 분산화의 여부가 다릅니다.
SVN의 경우 Local PC와 Remote Repository로 이루어져있습니다.
따라서 Local PC에서 commit 하면 바로 Remote Repository에 반영됩니다.
반면 Git은 Remote Repository와 Local PC 사이에 Local Repository를 가집니다.
그래서 각각의 작업자는 고유의 Local Repository를 가질 수 있습니다.

따라서 Git을 이용하면 SVN에 비해 좀 더 유연하게 소스를 운영할 수 있습니다.
SVN은 중앙 서버와 연결하지 않으면 버전 관리가 불가능하지만,
Git은 대부분의 버전 관리 작업을 네트워크가 없는 로컬 환경에서 수행할 수 있기 때문입니다.

<br>

## 3. git의 `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?

**git clone**은 Remote Repository를 통째로 자신의 PC에 복제하는 기능입니다. 작업을 위해 Remote Repository에 있는 소스코드를 자신의 PC에 복제해야 할 때 사용합니다. 복제한 Local Repository는 Remote Repository의 변경 이력도 포함하기 때문에 모든 이력을 참조할 수 있습니다.

사용법은 cli에서
``` bash
git clone (Remote Repository의 주소)
ex) git clone https://github.com/hyunjunkim-93/WebDevCurriculum.git
```
를 입력하여 사용할 수 있습니다.

<br>

**git add**는 프로젝트의 디렉토리에서 변경된 사항을 인덱스에 업데이트 하는 명령어입니다. 이 다음 단계인 commit 작업을 수행하기 위한 준비 단계이며, 이 과정에서 어떤 업데이트 내용을 commit 할지 정할 수 있습니다. add 명령어로 추가된 파일은 stage 영역에 들어가게 되고, stage 영역의 파일은 다음 commit 과정에 포함됩니다.

사용법은 cli에서
``` bash
git add .
git add (업데이트 할 파일 이름)
ex) git add add.md
```
를 입력하여 사용할 수 있습니다.

<br>

**git commit**은 stage 영역의 변경사항들을 Local Repository에 기록하는 명령어입니다. 이 기록에는 어떤 변화인지를 나타내는 메시지를 함께 적을 수 있습니다. 수정 사항들을 Remote Repository에 업데이트 하기 전의 과정이며, 소스 코드에 어떤 변경 사항이 있는지 Local 환경에서 기록하기 위해 사용합니다.

사용법은 cli에서
``` bash
git commit -m "변경 사항에 대한 메시지"
```
를 입력하여 사용할 수 있습니다.

<br>

**git push**는 Local Repository에 기록된 commit을 Remote Repository에 기록하는 명령어 입니다. 최종적으로 Local 환경에서의 작업 내용을 다른 이용자와 공유하기 위해 Remote Repository에 업데이트 할 때 사용합니다.

사용법은 cli에서
``` bash
git push (Remote Repository 이름) (branch 이름)
ex) git push origin master
```
를 입력하여 사용할 수 있습니다.

<br>

**git pull**은 Remote Repository의 내용을 Local Repository에 복제하는 명령어입니다. git clone 명령어처럼 Remote Repository를 복제한다는 점은 같지만, git clone의 경우 Local Repository에 해당 Remote Repository의 주소를 등록한다는 점이 다릅니다. git pull은 이미 등록된 주소를 바탕으로 내용을 복제합니다.

Local Repository의 내용을 Remote Repository 기준으로 업데이트 하기 위해 사용합니다. 보통은 Local에서의 변경 사항을 push 하기 전에 rebase 명령어와 함께 사용하여, 소스 코드의 충돌을 예방하고 커밋 그래프를 깔끔하게 유지합니다.

사용법은 cli에서
``` bash
git pull (Remote Repository 이름) (branch 이름)
ex) git pull origin master
ex) git pull --rebase origin master
```
를 입력하여 사용할 수 있습니다.

<br>

**git branch**는 Local Repository의 branch를 조작하는 명령어 입니다. 현재 Local Repository에 등록돼 있는 branch를 확인하거나, 새로 생성하거나 또는 삭제하기 위해 사용합니다.

사용법은 cli에서
``` bash
git branch
branch 목록을 확인합니다

git branch (브랜치 이름)
새로운 브랜치를 생성합니다

git branch -d (브랜치 이름)
해당 브랜치를 삭제합니다
```
를 입력하여 사용할 수 있습니다.

<br>

**git stash**는 작업하고 있는 디렉토리에서 수정한 파일들만 저장하는 명령어입니다. 작업 진행 중 급한 다른 요청이 들어왔을 때, 현재 작업 중인 내용을 저장해놓고 다른 브랜치로 이동해서 작업하는 경우에 사용합니다. 다른 브랜치에서의 작업이 완료되면, 작업 중이던 브랜치로 들어와서 저장했던 내용을 다시 현재 브랜치에 적용하여 작업을 이어나갈 수 있습니다.

사용법은 cli에서
``` bash
git stash
수정 사항 전체를 저장합니다

git stash apply
stash의 저장 목록 중 가장 최근 내역을 현재 브랜치에 적용합니다

git stash drop
stash의 저장 목록 중 가장 최근 내역을 삭제합니다
```
를 입력하여 사용할 수 있습니다.
