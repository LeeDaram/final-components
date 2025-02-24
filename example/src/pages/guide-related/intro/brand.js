import introduceImg from "../../../assets/images/brand/ai-1.png";
import Img1 from "../../../assets/images/brand/ai2-1.png";
import Img2 from "../../../assets/images/brand/ai2-2.png";
import Img3 from "../../../assets/images/brand/ai2-3.png";

function Brand() {
  return (
    <div className="dark:bg-gray-800 py-32 font-sans">
      {/* 메인 소개 섹션 */}
      <section className="p-16 text-center bg-blue-500 text-white rounded-2xl shadow-xl max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-8 tracking-tight">
          우리의 가치와 목표
        </h2>
        <hr className="border-white w-[8%] mx-auto mb-8" />
        <div className="bg-white shadow-lg rounded-2xl p-12 max-w-4xl mx-auto text-left text-gray-900 leading-loose">
          {[
            "창업부터 성장까지 필요한 정보와 네트워크를 제공합니다.",
            "변화하는 시장에 맞춰 유연한 전략을 세우고, 혁신으로 지속 성장합니다.",
            "소상공인을 돕고 성장할 기회를 제공합니다.",
            "투명한 운영과 정직한 소통으로 신뢰를 구축하고 장기적인 관계를 형성합니다.",
          ].map((text, index) => (
            <p
              key={index}
              className="text-lg flex items-start before:content-['✔'] before:mr-3 before:text-blue-500 mt-4"
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* 이미지 섹션 */}
      <section className="p-12 flex justify-center">
        <img
          src={introduceImg}
          alt="소개 이미지"
          className="w-full max-w-7xl h-[420px] object-cover rounded-2xl shadow-md"
        />
      </section>

      {/* 브랜드 철학 */}
      <section className="p-16 text-center bg-blue-500 text-white rounded-2xl shadow-xl max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-8 tracking-tight">
          소상공인을 돕고, 소비자가 믿을 수 있게.
        </h2>
        <hr className="border-white w-[8%] mx-auto mb-8" />
        <div className="bg-white shadow-lg rounded-2xl p-12 max-w-4xl mx-auto text-left text-gray-900 leading-loose">
          {[
            "소상공인을 돕고 성장할 기회를 제공합니다.",
            "소비자가 믿고 찾을 수 있는 환경을 만듭니다.",
            "소상공인 지원 소상공인을 돕고 성장할 기회를 제공합니다.",
            "소비자 신뢰 소비자가 믿고 찾을 수 있는 환경을 만듭니다.",
          ].map((text, index) => (
            <p
              key={index}
              className="text-lg flex items-start before:content-['✔'] before:mr-3 before:text-blue-500 mt-4"
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* 브랜드 가치 */}
      <section className="p-16 text-center text-gray-900">
        <h2 className="text-4xl font-bold mb-8 tracking-wide">브랜드 철학</h2>
        <hr className="border-blue-500 w-[8%] mx-auto" />
      </section>

      {/* 브랜드 이미지 및 설명 */}
      <div className="flex justify-center items-center">
        <div className="w-8/12 mx-auto">
          <section className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "시작과 목적",
                  description:
                    "착한 업소 솔루션은 소상공인을 돕고, 소비자가 믿고 찾을 수 있는 공간을 위해 시작되었습니다.",
                  image: Img1,
                },
                {
                  title: "핵심 가치",
                  description:
                    "단순한 업소 추천을 넘어, 착한 소비 문화를 조성하며 지역 경제 활성화에 기여하고자 합니다.",
                  image: Img2,
                },
                {
                  title: "앞으로의 목표",
                  description:
                    "앞으로도 소상공인과 소비자가 함께 성장하는 지속 가능한 플랫폼으로 발전해 나가겠습니다.",
                  image: Img3,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[270px] object-cover rounded-2xl shadow-lg"
                  />
                  <h3 className="text-2xl font-semibold mt-6 tracking-wide text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 헬프미 */}
      <section className="p-16 bg-white">
        <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl rounded-lg flex justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-left">
              착한가격업소, 무엇이 더 궁금하신가요?
            </h3>
            <p className="text-left text-blue-500">
              전화상담 연결은 해당 업소 주문 관련 상담만 가능합니다.
            </p>
          </div>
          <div className="flex space-x-6">
            {[
              { label: "도움요청", icon: "fa-info-circle" },
              { label: "영상보기", icon: "fa-video-camera" },
              { label: "전화상담", icon: "fa-phone" },
            ].map((item, index) => (
              <button
                key={index}
                className="bg-white border border-gray-300 text-gray-800 flex flex-col items-center p-4 shadow-sm rounded-lg
                     hover:bg-gray-100 active:scale-95 transition-all duration-200 ease-in-out"
              >
                <i className={`fa ${item.icon} text-3xl mb-2`}></i>
                <span className="text-base font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Brand;
