import { Accordion } from "flowbite-react";

function Faq() {
  // faq더미
  const faqData = [
    {
      question: "착한업소 등록 조건은 무엇인가요?",
      answer:
        "착한업소로 등록되기 위해서는 매장 가격이 동일 지역 평균 가격 대비 일정 비율 저렴해야 하며, " +
        "위생 및 청결 기준을 충족해야 합니다. 자세한 기준은 해당 지역 관할 지자체 또는 홈페이지에서 " +
        "확인할 수 있습니다.",
    },
    {
      question: "착한업소 등록 신청은 어디서 하나요?",
      answer:
        "착한업소 등록 신청은 각 지역의 관할 시청 또는 구청을 통해 가능합니다. 또한 일부 지자체에서는 " +
        "온라인 신청 시스템을 운영하고 있으므로 해당 지자체 홈페이지에서 확인 후 신청하면 됩니다.",
    },
    {
      question: "착한업소 등록에 걸리는 시간은 얼마나 되나요?",
      answer:
        "신청 후 심사 및 승인 절차에 따라 평균 2주에서 4주 정도 소요됩니다. 다만, 지역에 따라 심사 기간이 " +
        "다를 수 있으므로 신청 시 확인하는 것이 좋습니다.",
    },
    {
      question: "착한업소 등록 시 어떤 혜택이 있나요?",
      answer:
        "착한업소로 등록되면 해당 지자체에서 제공하는 홍보 지원, 세금 감면 혜택, 포털 사이트 및 지도 서비스에 " +
        "우선 등록되는 혜택을 받을 수 있습니다. 또한 일부 지자체에서는 물품 지원 등의 추가 혜택을 제공하기도 합니다.",
    },
    {
      question: "등록 신청이 반려되었을 때 어떻게 해야 하나요?",
      answer:
        "반려 사유를 확인한 후 부족한 부분을 보완하여 재신청할 수 있습니다. 일반적으로 가격 책정 기준, " +
        "위생 상태, 신청 서류 누락 등이 반려 사유가 될 수 있으므로, 신청 전 꼼꼼히 준비하는 것이 중요합니다.",
    },
    {
      question: "매장 사진은 어떤 기준으로 첨부해야 하나요?",
      answer:
        "매장 사진은 가게 전경, 내부 모습, 메뉴판 등이 포함된 3~5장의 사진을 제출해야 합니다. " +
        "사진은 최근 3개월 이내 촬영된 것이어야 하며, 가게의 청결 상태와 가격 정책을 확인할 수 있는 " +
        "이미지가 포함되어야 합니다.",
    },
    {
      question: "착한업소 등록 신청 후 정보를 수정할 수 있나요?",
      answer:
        "네, 착한업소 등록 후에도 업소 정보 수정이 가능합니다. 정보 변경이 필요한 경우, 해당 지자체 " +
        "홈페이지에서 수정 요청을 하거나, 직접 방문하여 서류를 제출하면 됩니다.",
    },
  ];

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50">
      <div className="w-9/12 flex items-start">
        {/* 이미지지 */}
        <div className="w-1/2 flex justify-center items-start flex-shrink-0 pt-[60px]">
          <div className="w-10/12 h-[550px] bg-gray-200 flex justify-center items-center text-gray-500 text-lg">
            이미지
          </div>
        </div>

        {/* FAQ */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-6">자주 묻는 질문</h2>
          <Accordion alwaysOpen>
            {faqData.map((item, index) => (
              <Accordion.Panel key={index}>
                <Accordion.Title className="!text-lg font-semibold">
                  {item.question}
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Faq;
