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

