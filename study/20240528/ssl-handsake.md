# SSL Handshake

### SSL handshake에 탑재된 기술

- 대칭키 암호화 방식
- 비대칭키 암호화 방식
- 디지털 서명
- 디지털 서명을 해주는 인증 기관
- 암호화된 메시지의 변조 여부를 확인할 수 있는 메시지 무결성 알고리즘

### 대칭키 암호화 방식

- 하나의 key로 평문을 암호화하고, 복호화할 때 사용하는 방식
- key 하나만 사용할 수 있는 간편함이 있지만, 도난을 당하면 누구나 복호화 할 수 있는 단점이 있다.

### 공개키 암호화 방식 (=비대칭키 암호화 방식)

- 두 개의 key를 한 쌍으로 암호화/복호화에 사용한다.
- 일반적으로 공개키를 암호화 한 것을 개인키로 복호화한다.
- 개인키를 먼저 만들고 공개키를 파생하여 한 쌍의 키를 만들기 때문에 key pair라고 부른다.
- 사전에 안전하게 서로의 공개키를 나누어 받는 과정이 필요하다
- 대칭키 방시겡 비해 안전하지만 계산 과정이 복잡해 컴퓨터의 자원을 많이 사용한다.

키 교환 대표 알고리즘

1. RSA
2. 디피 헬만

### SSL handshake과정

브라우저와 웹 서버가 암호화 통신을 할 수 있도록 하는 과정

1. 클라 → 서버 (`Client Hello`)
    
    브라우저가 웹 서버가 https를 사용하는 것을 알면 아래 정보를 같이 포함해서 전송한다.
    
    - 브라우저가 사용하는 ssl/tls정보
    - 암호화 방식 (ciper suite)
    - 브라우저가 생성한 난수
    - 만약 이전에 ssl handshake가 완료된 상태면, 그 때 생성된 session id
2. 서버 → 클라
    
    위의 인사에 응답하면서, 다음 정보를 전송한다.
    
    - 브라우저의 암호화 방식 중에서 서버가 지원하고 선택한 암호화 방식
    - 서버의 공개키가 담긴 SSL 인증서, 인증서는 CA의 비밀키로 암호화되어 발급된 상태
    - 서버가 생성한 난수
3. 클라
    
    브라우저는 서버의 SSL 인증서가 믿을만 한 지 확인한다. 브라우저는 내장된 CA 공개키로 암호화된 인증서를 복호화한다.
    
4. 클라
    
    브라우저는 자신이 생성한 난수와 서버가 생성한 난수를 사용하여 parameter secret을 생성한다.
    
5. 서버
    - 서버는 사이트의 비밀키로, 브라우저가 보낸 parameter secret을 복호화한다.
    - 복호화 한 값을 `Master secret`으로 지정하며 `session key`를 생성한다.
    - 세션 키는 대칭키 암호화에 사용될 키이다.
    - 해당 키로 브라우저와 서버 사이의 데이터를 암호화하고 복호화 한다.
6. ssl handshake를 종료하고, https 통신을 시작한다.
    - HTTPS통신이 완료되는 시점에 세션 키를 폐기한다.

### HTTPS만 적용하면 안전한 것인가?

- https는 전달 구간에 대한 보안 기술인데, 전달 구간 중간에 해커가 중간자 공격을 수행할 수 있는 취약점이 있다면 https는 유지되지만, 전달은 노출이된다.
- 그래서 개인간 대화 같은 민감한 정보 등의 전달에는 `종단 간 암호화 기술`(end-to-end encryption)을 추가적으로 적용한다.

### Reference

- https://brunch.co.kr/@sangjinkang/38
