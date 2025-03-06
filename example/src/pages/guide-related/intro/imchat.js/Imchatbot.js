import { useState, useEffect, useRef } from "react";

const ImchatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // 챗봇 시작 시 명령어 목록 자동 추가
    const initialMessages = [
      {
        text: `바로가기 목록:\n1. /팀\n2. /지도\n3. /로그인\n4. /지원\n6. /프로필\n7. /대시보드\n8. /연락처\n9. /업소찾기\n10. /예약\n11. /문의\n12. /공지사항\n13. /이벤트`,
        type: "other-message",
      },
      {
        text: `추가 명령어 목록:\n1. /추천업소\n2. /영업시간\n3. /위치\n4. /리뷰\n5. /예약확인\n6. /문의하기\n7. /이용약관\n8. /개인정보처리방침`,
        type: "other-message",
      },
    ];
    setMessages(initialMessages);
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    // 1) 내가 보낸 메시지 먼저 추가
    const newMessages = [...messages, { text: input, type: "my-message" }];
    setMessages(newMessages);
    setInput("");

    // 2) 봇 응답 추가
    setTimeout(() => {
      const botMessage = generateBotResponse(input);

      // (A) 알 수 없는 명령어일 때
      if (botMessage === "UNRECOGNIZED") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "죄송합니다. 이해하지 못했습니다. '도움말'을 입력해 사용 가능한 명령어를 확인해 주세요.",
            type: "other-message",
          },
          {
            text: `바로가기 목록:\n1. /팀\n2. /지도\n3. /로그인\n4. /지원\n6. /프로필\n7. /대시보드\n8. /연락처\n9. /업소찾기\n10. /예약\n11. /문의\n12. /공지사항\n13. /이벤트`,
            type: "other-message",
          },
          {
            text: `추가 명령어 목록:\n1. /추천업소\n2. /영업시간\n3. /위치\n4. /리뷰\n5. /예약확인\n6. /문의하기\n7. /이용약관\n8. /개인정보처리방침`,
            type: "other-message",
          },
        ]);
      }
      // (B) REDIRECT 처리
      else if (botMessage.startsWith("REDIRECT:")) {
        const path = botMessage.split(":")[1];
        window.location.href = path;
      }
      // (C) 일반 문자열 응답
      else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, type: "other-message" },
        ]);
      }
    }, 500);
  };

  const generateBotResponse = (input) => {
    const responses = {
      안녕: "안녕하세요! 착한가격 업소 챗봇입니다. 😊 무엇을 도와드릴까요?",
      잘가: "이용해 주셔서 감사합니다. 다음에 또 봐요! 👋",
      //인사
      1: "REDIRECT:/intro/site",
      2: "REDIRECT:/intro/service",
      3: "REDIRECT:/intro/brand",
      4: "REDIRECT:/find/map",
      5: "REDIRECT:/chat/room",
      //리다이렉트 명령어(1)
      6: `현재 추천 업소는 다음과 같습니다:\n1. 맛있는 식당\n2. 편안한 카페\n3. 합리적인 숙소`,
      7: `업소별 영업시간은 다음과 같습니다:\n- 맛있는 식당: 10:00 ~ 22:00\n- 편안한 카페: 08:00 ~ 20:00\n- 합리적인 숙소: 24시간`,
      8: `업소 위치는 다음과 같습니다:\n- 맛있는 식당: 서울시 강남구\n- 편안한 카페: 서울시 서초구\n- 합리적인 숙소: 서울시 종로구`,
      9: "업소 리뷰를 확인하려면 해당 업소 페이지를 방문해 주세요. 😊",
      10: "예약 확인을 위해 로그인 후 '마이페이지'를 방문해 주세요.",
      11: "문의 사항은 '문의하기' 페이지를 통해 남겨주세요. 빠르게 답변 드리겠습니다.",
      12: "이용약관은 terms에서 확인하실 수 있습니다.",
      13: "개인정보처리방침은 privacy에서 확인하실 수 있습니다.",
      // 명령어 숫자로 변환

      "/팀": "REDIRECT:/team",
      "/지도": "REDIRECT:/map",
      "/로그인": "REDIRECT:/login",

      //리다이렉트 명령어(2)

      "/지원": "지원 관련 정보는 관리자에게 문의하세요.",
      "/프로필": "사용자 프로필을 보려면 로그인 후 마이페이지를 확인하세요.",
      "/대시보드": "대시보드는 관리자 페이지에서 확인 가능합니다.",
      "/연락처": "고객센터 연락처는 홈페이지 하단을 참고해주세요.",
      "/도움말": `사용 가능한 명령어 목록:\n1. /업소찾기\n2. /예약\n3. /문의\n4. /공지사항\n5. /이벤트\n6. /추천업소\n7. /영업시간\n8. /위치\n9. /리뷰\n10. /예약확인\n11. /문의하기\n12. /이용약관\n13. /개인정보처리방침`,
      "/착한가격":
        "착한가격 업소는 합리적인 가격으로 서비스를 제공하는 업소를 소개합니다. 🏪",
    };

    // (1) 명령어 사전에 있으면 해당 응답 반환
    // (2) 없으면 "UNRECOGNIZED" 반환
    const key = input.trim().toLowerCase();
    if (responses[key]) {
      return responses[key];
    } else {
      return "UNRECOGNIZED";
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 ">
      <div className="w-96 h-[600px] rounded-lg bg-white flex flex-col shadow-lg">
        <div
          className="flex-1 p-3 overflow-y-auto border-b border-gray-300"
          ref={chatBoxRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`m-1 p-2 rounded max-w-[70%] break-words ${
                msg.type === "my-message"
                  ? "bg-green-400 ml-auto"
                  : "bg-gray-400 text-left mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex p-3 border-t border-gray-300 bg-white rounded-b-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 border text-black border-gray-400 rounded text-lg"
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-2 py-2 bg-blue-500 text-white rounded text-lg hover:bg-blue-700"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImchatBot;

/* <div class="mockup-phone">
  <div class="camera !z-0"></div> 
  <div class="display flex justify-center">
    <div class="artboard artboard-demo phone-1"><img class="size-full object-cover" src="https://cdn.flyonui.com/fy-assets/components/iphone/image.png" alt="phone background" /></div>
  </div>
</div> */
