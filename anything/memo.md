- Nestjs 9/10 이후, 환경변수에 가져오는 변수들을 엄격하게 타입 강제 부여(이전버전에서는 any로 해도 무방)
```
# Non-null assertion 사용(! 사용)
await app.listen(process.env.PORT!);

# exception 예외 처리
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');
```

- virtual 몽고 DB에 저장하지 않고, 클라이언트에 노출되고 싶은 값들만 지정하는 필드 
virtual를 따로 선언하거나 클래스내에서도 데코레이터를 이용하여 선언 가능

- 상속을 통해 클래스 재사용률 높임(PickType, OmitType)

- jwt 모듈 내에서 secret 등의 변수들을 다이렉트로 환경변수를 지정하는 경우에는, 제대로 값을 치환해서 가져오지 못함 
    - configureModule이 이미 appModule에 선언되어져 있다면, global = true 로 설정
    - 해당 특정 모듈에서 configureModule가 jwtModule 보다 선 import > registerAsync() 처리 

| 비교 항목       | `register()` | `registerAsync()`     |
| ----------- | ------------ | --------------------- |
| 설정 값        | 즉시 제공        | 팩토리 함수, DI 기반 제공      |
| 환경변수 접근     | 시점 문제로 불안정   | ConfigService로 안정적 DI |
| 의존성이 필요한 설정 | ❌ 불가능        | ⭕ 가능                  |
| 동적 설정       | ❌            | ⭕                     |


| 관점                  | 설명                             |
| ------------------- | ------------------------------ |
| **register()**      | “값 바로 넣을게요!” (정적 설정)           |
| **registerAsync()** | “DI 먼저 받고, 그 다음 설정해요!” (동적 설정) |


- registerAsync() 필요한 상황 4가지

| 상황                       | 이유                                   |
| ------------------------ | ------------------------------------ |
| 1️⃣ ConfigService를 이용할 때 | DI가 필요함                              |
| 2️⃣ 암호화/토큰/보안 값          | 초기화 시점에 process.env가 아직 안전하지 않을 수 있음 |
| 3️⃣ 동적 설정(조건에 따라 값 변경)   | 실행 중 로직이 필요                          |
| 4️⃣ 외부 의존성 / 모듈 설정값 필요   | 다른 모듈을 import해서 가져옴                  |


- interface vs type

1️⃣ 인터페이스(interface) 용도

객체의 구조를 정의할 때 주로 사용

클래스가 구현(implements)할 수 있음

확장(extends) 가능 → 다른 인터페이스와 합치기 쉽다

컴파일 시점에서만 존재, 런타임에는 없음

````

interface Cat {
  name: string;
  age: number;
}

const kitty: Cat = { name: 'Momo', age: 2 };

// 클래스 구현
class MyCat implements Cat {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
````

2️⃣ 타입 별칭(type) 용도

원시 타입, 유니언 타입, 튜플, 인터페이스, 객체 등 모든 타입에 사용 가능

상속보다는 합성(&)에 적합

컴파일 시점에서만 존재, 런타임에는 없음

```
type Cat = {
  name: string;
  age: number;
};

// 유니언 타입 가능
type ID = string | number;

type CatWithID = Cat & { id: ID };

const kitty: CatWithID = { name: 'Momo', age: 2, id: 'abc' };
```

3️⃣ 언제 interface를 쓰고, 언제 type을 쓰는가?
| 상황            | interface                     | type                      |
| ------------- | ----------------------------- | ------------------------- |
| **객체 구조만 정의** | ✅                             | ✅                         |
| **클래스 구현**    | ✅                             | ❌ (`type`은 implements 불가) |
| **합성/유니언/튜플** | ❌ 제한적                         | ✅                         |
| **확장**        | interface extends interface ✅ | type = type & type ✅      |


4️⃣ NestJS에서 사용 패턴

DTO / Schema / Entity 같은 객체 구조 정의 → interface or type

클래스 기반 DTO/Schema → validation과 Swagger decorator 때문에 대부분 class 사용

Service/Repository에서 반환값 타입 지정 → interface 또는 type

Union/Partial/Intersection 같은 타입 조합 → type

```
interface CatInterface {
  id: string;
  name: string;
  age: number;
}

type CatType = CatInterface & { createdAt: Date };

```

즉, NestJS에서는 대부분 클래스 + DTO + interface/type 혼용
interface = 클래스 구현 가능, 객체 구조 정의용
type = 거의 모든 타입 정의 가능, 합성/유니언/튜플에 강점

- https://mongoosejs.com/docs/populate.html
  - ❗️collections명 정확히 명시

- 이전 NestJs보다 타입스크립트를 엄격하게 판별하기 때문에 _id 같은 것도 스키마에 명시해야 함