# React 공부

velopert 강의 참고

### 클래스 컴포넌트와 함수형 컴포넌트

- 클래스 컴포넌트

  부모 컴포넌트에게서 받은 값을 this.props로 접근할 수 있다.

```
class MyName extends Component {
  static defaultProps = {
    name: 'jungeun'
  }
  render() {
    return (
      <div>
        My name is {this.props.name}!!
      </div>
    );
  }
}
```

- 함수형 컴포넌트

  단순히 props만 받아와서 보여주는 경우 함수형 컴포넌트를 사용하는 것이 간단하다. 간단한만큼 state와 lifecycle은 사용할 수 없다.

  클래스형 컴포넌트와 다른 defaultProps 설정 방식도 참고하자.

```
const MyName = ({ name }) => {
  return (
    <div>
      My name is {name}~
    </div>
  );
};

MyName.defaultProps = {
  name: 'jungeun'
};
```



### Props와 State

- Props

  props는 부모 컴포넌트가 자식 컴포넌트에게 주는 값이다. 자식 컴포넌트는 props를 수정할 수 없다.

- State

  state는 컴포넌트 내부에서 선언하며 내부에서 값을 변경할 수 있다.

  state를 초기화하는 방법은 두가지가 있다.

  - class fields 사용

    class fields를 사용하는 방법이 더 편하다. 

    ```
    class Counter extends Component {
    	state = {
    		number: 0
    	}
    	...
    }
    ```

  - 생성자(constructor) 사용

    > ```super(props)```를 호출하는 이유는 컴포넌트를 만들면서 React의 Component를 extends했기 때문에 constructor를 작성하면 부모 클래스 생성자를 덮어쓰기 때문이다. 따라서 기존의 React.Component의 생성자를 ```super```로 미리 실행하고 그 다음에 현재 컴포넌트에서 수행할 작업을 해주는 것이다.

    ```
    class Counter extends Component {
    	constructor(props) {
    		super(props);
    		this.state = {
    			number: 0
    		}
    	}
    	...
    }
    ```

  

### 메소드 작성

- 화살표 함수

  ```
  handelIncrease = () => {
      this.setState({
        number: this.state.number + 1
      });
  }
  ```

- 기본 함수

  ```
  handleIncrease() {
      this.setState({
        number: this.state.number + 1
      });
  }
  ```

  이 방법으로 하게 되면 나중에 클릭이벤트가 발생했을 때 this가 ```undifined```로 나타나 제대로 처리가 되지 않게 된다. 함수가 버튼의 클릭이벤트로 전달되는 과정에서 this와 연결이 끊기기 때문이다. 이를 방지하기 위해선 첫번째 방법처럼 **화살표 함수**를 사용하거나 생성자에서 다음과 같이 **bind**를 해야한다.

  ```
  constructor(props) {
  	super(props);
  	this.handleIncrease = this.handleIncrease.bind(this);
  }
  ```



### setState

state의 값을 바꾸기 위해선 this.setState를 무조건 거쳐야한다. **리엑트에서 setState함수가 호출되면 컴포넌트가 리렌더링된다.** 

##### setState에서 주의해야할 점을 살펴보자.

- 객체로 전달되는 값만 업데이트

  ```
  state = {
  	number: 0,
  	foo: 'bar'
  }
  ```

  state가 위와 같을 때 ```this.setState({ number: 1 });```를 하게 되면 foo는 그대로 남고 number값만 업데이트 된다.

- setState는 객체의 깊은 곳까지 확인하지 않는다.

  ```
  state = {
  	number: 0,
  	name: {
  		foo: 0,
  		bar: 1
  	}
  }
  ```

  state가 위와 같을 때 ```this.setState({ name: { foo: 2 } });``` 를 하게되면 state는 다음과 같이된다.

  ```
  {
  	number:0,
  	name: {
  		foo: 2
  	}
  }
  ```

  기존의 name 객체가 바뀌어 버리는 것이다. 따라서 다른 값들은 유지하면서 foo만 변경하고 싶다면 다음과 같이 해야한다.

  ```
  this.setState({
  	number: 0,
  	name: {
  		...this.state.name,
  		foo: 2
  	}
  });
  ```

  **...는 자바스크립트의 전개연산자이다.** 기존의 객체안에 있는 내용을 해당 위치에 풀어준다는 의미이다. ... 후에 설정하고 싶은 값을 또 넣어주면 해당 값으로 덮어쓰게 된다.

  > 이 작업은``` immutable.js``` 혹은 ```immer.js```로 더 간편히 해결될 수 있다. 특히 state가 깊은 구조로 구성되어 있는 경우 사용해보자.

- (Option) setState에 객체 대신 함수 전달하기

  기존의 코드가 다음과 같을 경우,

  ```
  this.setState({
    number: this.state.number + 1
  });
  ```

  this.state를 조회하지 않고 updater 함수를 전달해보자.

  ```
  this.setState(
    (state) => ({
      number: state.number + 1
    })
  );
  ```

  여기서 더 나아가 비구조화 할당 문법을 사용해 보자.

  ```
  const { number } = this.state;
  this.setState({
    number: number + 1
  });
  ```



### 이벤트 설정

```
<button onClick={this.handelIncrease}>+</button>
```

리액트에서 이벤트 함수는 

1. **camelCase**로 설정해 주어야 한다. 

   onclick은 onClick, onmousedown은 onMouseDown, onchange는 onChange와 같은 식으로 해야 한다. 

2. 이벤트에 전달하는 값은 **함수**여야 한다.

   만약 ```onClick={this.handelIncrease()}```이렇게 메소드를 호출하게 되면 렌더링 -> 함수호출 -> setState -> 렌더링 -> ... 이렇게 무한 호출이 되어버린다.



### LifeCycle API

1. 컴포넌트 초기 생성

   컴포넌트가 브라우저에 나타나기 전 호출되는 API이다.

   - **constructor**

     컴포넌트 생성자 함수이다. 컴포넌트가 새로 만들어질 때마다 이 함수가 호출된다.

   - [DEPRECATE] **componentWillMount**

     이 API는 컴포넌트가 화면에 나가기 직전에 호출되는 API이다. 리액트 v16.3에서는 deprecate되었고 이후엔 ```UNSAFE_componentWillMount()```라는 이름으로 사용된다.  기존에 이 API에서 하던 것들은 constructor와 componentDidMount에서 충분히 처리할 수 있다.

   - **componentDidMount**

     이 API는 컴포넌트가 화면에 나타나게 됐을 때 호출된다. 여기선 주로 D3, masonry처럼 DOM을 사용해야 하는 외부 라이브러리 연동을 하거나 해당 컴포넌트에서 필요로 하는 데이터를 요청하기 위해 ajax 요청을 하거나 DOM의 속성을 읽거나 변경하는 작업을 진행한다. (스크롤 설정, 크기 읽어오기 등)

2. 컴포넌트 업데이트

   컴포넌트 업데이트는 props와 state의 변화에 따라 결정된다.

   - [DEPRECATE] **componentWillReceiveProps**

     이 API는 컴포넌트가 새로운 props를 받게 됐을 때 호출된다. 이 안에서는 주로 state가 props에 따라 변해야 하는 로직을 작성한다. 새로 받게될 props는 nextProps로 조회할 수 있으며 여기선 아직 this.props는 바뀌지 않은 상태이다. 이 API도 v16.3부터 deprecate 되었고 ```UNSAFE_componentWillREceiveProps()```로 사용된다. 그리고 이 기능은 상황에 따라 새로운 API인 ```getDerivedStateFromProps```로 대체 될 수 있다.

   - [NEW] **static getDerivedStateFromProps**

     이 함수는 v16.3 이후에 만들어진 API이다. props로 받아온 값을 state로 동기화하는 작업을 할 때 사용된다. 여기서는 **setState를 하는것이 아니라 특정 props가 바뀔 때 설정하고 싶은 state 값을 리턴**하는 형태로 사용된다.

     ```
     static getDerivedStateFromProps(nextProps, prevState) {
     	if (nextProps.value !== prevState.value){
     		return { value: nextProps.value };
     	}
     	return null;
     }
     ```

     null을 리턴하면 따로 업데이트할 것이 없다는 뜻이다.

   - **shouldComponentUpdate**

     이 API는 컴포넌트를 최적화하는 작업에서 매우 유용하다. 리액트에선 변화가 발생한 부분만 업데이트를 해주는 장점이 있는데 이렇게 변화가 발생한 부분을 알기 위해선 Virtual DOM에 한번 그려줘야 한다. 

     즉 현재 컴포넌트의 상태가 업데이트되지 않아도 부모컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링된다. 여기서 렌더링된다는 의미는 render()함수가 호출된다는 의미이다.

     변화가 없으면 DOM조작은 하지 않는다. 그저 Virtual DOM에만 렌더링 할 뿐이다. 이 작업은 부하가 많은 작업은 아니지만 컴포넌트가 매우 많다면 말이 달라진다. 불필요한 Virtual DOM리렌더링을 방지하기 위해 이 API를 사용한다. 기본적으로 true를 반환한다.

     ```
     shouldComponentUpdate(nextProps, nextState) {
     	return this.props.value !== nextProps.value
     }
     ```

   - [DEPRECATE] **componentWillUpdate**

     이 API는 shouldComponentUpdate에서 true를 반환했을 때 호출된다. 여기선 주로 애니메이션 효과를 초기화하거나 이벤트 리스너를 없애는 작업을 한다. 이 함수 후엔 render()가 호출된다. 이 API도 v16.3이후로 deprecate된다. 이 기능은 ```getSnapshotBeforeUpdate```로 대체될 수 있다.

   - [NEW] **getSnapshotBeforeUpdate**

     이 API는 **render()함수가 호출된 후, 실제 DOM에 변화가 발생되기 전** 호출된다. 이 API를 통해 DOM변화가 일어나기 직전의 DOM상태를 가져오고 여기서 리턴하는 값은 ```componentDidUpdate```의 3번째 인자로 받아올 수 있다.

   - **componentDidUpdate**

     이 API는 실제 DOM에 변화가 생긴 후 발생한다. 이 시점에선 this.props와 this.state가 바뀌어 있다. 그리고 인자로 prevProps와 prevState를 조회할 수 있다. 그리고 ```getSnapshotBeforeUpdate```에서 반환한 snapshot 값도 인자로 받는다.

     다음의 코드는 새 데이터가 추가되어도 스크롤바를 유지하는 코드이다.

     ```
     getSnapshotBeforeUpdate(prevProps, prevState) {
     	if (prevState.array !== this.state.array){
     		return { this.list.scrollTop, this.list.scrollHeight };
     	}
     }
     
     componentDidUpdate(prevProps, prevState, snapshot) {
     	if (snapshot) {
     		if (this.list.scrollTop != snapshot.scrollTop) {
     			return ;
     		}
     		const diff = this.list.scrollHeight - snapshot.scrollHeight;
     		this.list.scrollTop += diff;
     	}
     }
     ```

3. 컴포넌트 제거

   컴포넌트가 더이상 필요하지 않게 되면 단 하나의 API가 호출된다.

   - **componentWillUnmount**

     여기선 등록했던 이벤트를 제거하고, setTimeout을 했다면 clearTimeout으로 제거하고 외부라이브러리를 사용하고 해당 라이브러리에 dispose기능이 있다면 여기서 호출하여 인스턴스를 제거한다.

4. 컴포넌트 에러 발생

   render함수에서 에러가 발생한 경우 유용하게 사용할 수 있는 API이다.

   - **componentDidCatch**

     에러가 발생하면 이 API가 호출되게 하고 state.error를 true로 설정하게 하고 render함수에서 이에 따른 에러를 띄워주면 된다. 여기서 주의할 것은 **컴포넌트 자신의 render함수에서 발생한 에러는 잡아낼 수 없지만 자식 컴포넌트 내부에서 발생한 에러들은 잡아낼 수 있다**는 것이다!

     보통 렌더링 부분에서 오류가 발생하는 것은 사전에 방지해야 한다. 주로 에러가 발생하는 이유는 다음과 같다.

     - 존재하지 않는 함수를 호출하려고 할때
     - 배열이나 객체를 받으려고 했는데 해당 객체나 배열이 props에 존재하지 않을 때

     이런 것들은 render함수에서 ```if ( !this.props.object ) return null;```과 같이 처리하거나 ```defaultProps```로 기본 값을 설정하면 된다. 이 이외의 버그들은```componentDidCatch```로 잡아보자.



### Input 상태 관리하기

input 상태 관리에서 중요한 것은 자식 컴포넌트에서 생성된 데이터들이 state에 있을 때 이를 부모 컴포넌트에 전달할 때의 처리이다. 이런 경우 **부모컴포넌트에서 메소드를 만들고, 이를 자식에 전달하고 자식 내부에서 예를들어 submit 버튼을 눌렀을 때 부모 메소드를 호출하는 방식**을 사용한다.

여기서 부모컴포넌트에서 handleSubmit 함수에선 ```e.preventDefault()```함수를 호출한다. 왜냐면 원래 form에서 submit이 발생하면 페이지를 리로딩하는데, 이렇게 되면 지니고 있는 상태를 다 잃어버리기 때문이다. 



### 배열다루기 

### - 생성(Create)

리액트에서 데이터를 추가할땐 state내부의 값을 직접 수정하면 절대 안된다. 이를 불변성 유지라고 하는데 push, splice, unshift, pop같은 내장함수는 배열 자체를 수정하므로 적합하지 않다. 대신, 기존의 배열에 기반해 새 배열을 만들어내는 함수인 **concat, slice, map, filter**같은 함수를 사용해야 한다.

리액트에서 불변성 유지는 매우 중요하다. 불변성이 유지가 되어야 필요한 상황에 리렌더링 되도록 설계할 수 있고, 그렇게 해야 성능도 최적화 할 수 있기 때문이다.

```
this.setState({
  information: information.concat({ id: this.id++, ...data })
})
```



### - 렌더링(Read)

배열을 컴포넌트로 변환해본다. 컴포넌트를 여러개 렌더링하기 위해서는 map을 사용하면 된다. 예를들어 data와 dataList컴포넌트가 있을 때, dataList 컴포넌트의 render함수에서는 다음과 같이 map을 사용할 수 있다.

```
const list = data.map(
	info => (<phoneInfo key={info.id} info={info}/>)
)
```

그러고 return에서 {list}를 보여주기만 하면 되는 것이다.

리액트에서 배열 렌더링 시 꼭 필요한 것은 바로 key이다. key를 따로 부여하지 않으면 배열의 index값을자동으로 key로 설정을한다. 그러나 이렇게 되면 중간에 값을 넣게 되면 그 뒤의 모든 key가 변경이 되는 일이 발생한다. 따라서 최적화를 위해 데이터를 추가할때 마다 **고유한 값**을 key로 부여해야 한다!



### - 제거(Delete)

기존의 배열 데이터를 건들지 않으면서 데이터를 제거하기 위해 여러 방법을 사용할 수 있다.

예를들어 ```const arr = [1,2,3,4,5];```배열이 있을 때 3을 없애기 위해서 다음과 같이 할 수 있다.

```
arr.slice(0,2).concat(arr.slice(3,5))
// 혹은
arr = [ ...arr.slice(0,2), ...arr.slice(3,5)];
```

여기서 ```filter```라는 내장함수를 이용하면 더 쉽게 제거할 수 있다.

```
arr.filter(num => num !== 3);
```

App.js에서 상태정보를 가지고 있을 경우, 여기서 handleRemove함수를 구현하고, 자식 컴포넌트에 onRemove함수인자로 넘겨준다. 예를 들어 List가 있고 List의 자식컴포넌트인 Item이 있다고 했을 때, List도 Item에 onRemove함수 인자로 부모컴포넌트(App.js)에게서 받은 props.onRemove 함수를 넘겨준다. 그리고 Item에서 삭제버튼이 클릭 되었을 때 onRemove함수의 인자로 id를 넘겨주면 된다.

```
// App.js
    handleRemove = (id) => {
        const { information } = this.state;
        this.setState({
          information: information.filter(info => info.id !== id)
        })
    }
    
    render() {
        const { information } = this.state;
        return(
            ...
            <PhoneInfoList data={information} onRemove={this.handleRemove} />
        );
    }

// List.js
  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (
        <Item
          key={info.id}
          info={info}
          onRemove={onRemove}
        />
      )
    );
    
// Item.js
  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }
  
  render() {
      return(
          ...
          <button onClick={this.handleRemove}>remove</button>
      );
  }
```



### - 수정(Update)

수정할때도 기존의 배열과 객체를 직접적으로 수정하면 안된다. 예를들어 다음과 같은 배열이 있을 때 id가 1인 text의 값을  Korea로 바꾸어본다.

```
const array = [
  { id: 0, text: 'hello', tag: 'a' },
  { id: 1, text: 'world' , tag: 'b' },
  { id: 2, text: 'bye', tag: 'c' }
];

const modArray = array.map(item => item.id === 1 
	? ({ ...item, text:'Korea' }) : item)
```

여기서도 제거할 때와 마찬가지로 App에서 update로직을 수행한다. 다만 다른 것은 Item에서 ```editMode```와 같이 수정 전과 후를 알 수 있는 변수를 state에 정의하고 그에 따라 처리를 해준다. 그래서 componentDidUpdate에서도 ```prevState.editMode```와 ```this.state.editMode```를 가지고 setState를 할지 onUpdate를 할지 분기해준다.



### 불변성을 지키는 이유

여러가지 기능에 따라 많은 컴포넌트가 있는 경우, 한 컴포넌트가 업데이트 됐다고 해서 다른 컴포넌트들까지 리렌더링이 될 필요는 없다. 실제로, 다른 컴포넌트들까지 변화가 일어나진 않지만 Virtual DOM에 리렌더링 되는 자원까지도 아끼기 위해 우리는 위에서 shouldComponentUpdate LifeCycle API를 사용하였다.

이렇게 변화가 필요하지 않을 때는 render함수가 호출되지 않는데, 어떻게 이렇게 간단히 구현이 된걸까?

그 이유는 바로 **불변성을 지켜주었기 떄문**이다.

불변성을 우선 알아보자. 배열을 수정하는 경우이다.

```
const array = [1,2,3,4];
const sameArray = array;
sameArray.push(5);

console.log(array !== sameArray)	//false
```

```sameArray = array```를했기 때문에 배열이 복사된것이 아니라  레퍼런스만 추가된 것이다. 한마디로 같은 객체를 가리키고 있는 것이다. 여기서 불변성을 유지하려면 ```const sameArray = [...array, 5]``` 이렇게 하면 된다. 

이는 객체를 다룰때도 마찬가지이다.

```
const object = {
	foo: 'hello',
	bar: 'world'
};

// NO
const sameObject = object;
sameObject.baz = 'bye';

// YES
const diffObject = {
	...object,
	baz: 'bye'
};
```



### 최적화

각 컴포넌트마다 ```shouldComponentUpdate```를 구현하여 최적화를 해본다.



### TODO

- 스타일링

  가장 기본적인 CSS를 다뤄보자.

- 상태 관리

  APP => infoList => info와 같이 데이터가 한방향으로 전달되는 간단한 프로젝트가 아닌 state가 매우 복잡해지고 업데이트되는 로직이 굉장히 복잡해 졌을 때를 위해 사용하는 ```Redux```와 ```MobX```도 사용해 보자.

- 불변성 유지

  어렵진 않지만 데이터가 깊어질 때 쉽게 불변성을 유지하기 위한 ```Immutable.js```나 ```Immer```라이브러리도 사용해본다.

- 라우팅

  single page webapp이 아닌 주소에 따라 다른 뷰를 보여주어야 할 경우, ```react-router``` 또는 ```Next.js``` 라우터를 사용해 보자.

- 테스팅

  단순히 프로젝트를 구현하는것에서 테스팅까지 해보는 작업을 해본다. ```Jest와 Enzyme```를 사용한 컴포넌트 테스팅을 해보자.

- 타입 시스템

  좀더 체계적인 코드를 작성하기 위해서 TypeScript를 사용하거나 Flow를 사용할 수 있다.

- 프로젝트

  회사의 직원들을 위한 웹을 만들어본다! 우선 게시판에서 시작해서 다양한 기능을 추가해 보자!

