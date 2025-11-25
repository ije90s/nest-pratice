- Nestjs 9/10 이후, 환경변수에 가져오는 변수들을 엄격하게 타입 강제 부여(이전버전에서는 any로 해도 무방)
```
# Non-null assertion 사용(! 사용)
await app.listen(process.env.PORT!);

# exception 예외 처리
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');
```