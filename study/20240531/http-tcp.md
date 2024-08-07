# TCP vs UDP

- TCP는 연결 지향형 프로토콜로 신뢰성 있는 데이터 전송을 보장한다.
- UDP는 Connectionless 프로토콜로 빠르지만 데이터의 유실 가능성이 존재하는 걸로 알고 있다.

보통 TCP를 사용하고 실시간성이 중요한 방송(스트리밍, 통화) 등에는 UDP등을 이용한다.

### TCP 특징

- 연결형 서비스로 `가상 회선 방식`을 제공한다.
- 3-way handshaking과정을 통해 연결을 설정하고 4-way handshaking을 통해 해제한다.
- 흐름 및 혼잡제어
- 높은 신뢰성 보장
- UDP보다 속도가 느리다.
- 전이중, 점대점 방식

### TCP 서버 특징

- 서버소켓은 연결만을 담당한다.
- 서버와 클라는 `1대1` 연결된다.
- 스트림 전송으로 전송 데이터의 크기가 무제한이다.
- 패킷에 대해 응답을 해야 하기 때문에 성능이 낮다.
- Streaming 서비스에 불리하다(손실될 경우 재전송 요청을 하므로)

### UDP 특징

- 비연결형 방식으로 데이터그램 방식을 제공
- UDP 헤더의 CheckSum 필드를 통해 최소한의 오류만 검출한다.
- 신뢰성이 낮다.
- TCP보다 속도가 빠르다.

### UDP 서버 특징

- 연결 자체가 없어서 서버 소켓과 클라 소켓의 구분이 없다.
- 소켓 대신 IP 기반으로 통신한다.
- 서버와 클라이언트는 `1:N`, `n:m`등으로 연결될 수 있다.
- 데이터그램 단위로 전송되며 655535 바이트로 크기가 초과하면 잘라서 보낸다.
- `흐름제어`가 없어서 패킷이 제대로 전송됬는지, 오류가 없는지 확인할 수 없다.
- 성능이 중요시 되는 경우에 사용된다.

# HTTP 통신과 Socket 통신 차이

### HTTP 통신

- Client의 요청이 있을 때만 서버가 응답하여 해당 정보를 전송하고 연결을 종료하는 방식
- Server로부터 응답을 받은 후에는 연결이 바로 종료된다.
- 실시간 연결이 아니고, 필요한 경우에만 Server로 요청을 보내는 상황에 유용하다.

### Socket 통신

- server와 client가 특정 port를 통해 연결을 성립하고 있어 실시간으로 `양방향 통신`이다.

### Reference

- https://land-turtler.tistory.com/154
- https://bny64.github.io/2020/12/11/http-socket/
