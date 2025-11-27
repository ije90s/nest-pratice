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
