import { Accordion } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Faq() {
  const [faqData, setFaqData] = useState([]); // faq 데이터
  const [pageError, setPageError] = useState(false);
  useEffect(() => {
    const getFaqData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/faq/all");
        setFaqData(res.data);
      } catch (error) {
        console.log("ERROR");
      }
    };
    getFaqData();
  }, []);
  console.log(faqData);
  // useEffect(() => {

  // }, [faqData]);

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50">
      <div className="w-9/12 flex items-start">
        {/* 이미지 */}
        <div className="w-1/2 flex justify-center items-start flex-shrink-0 pt-[60px]">
          <div className="w-10/12 h-[550px] bg-gray-200 flex justify-center items-center text-gray-500 text-lg">
            이미지
          </div>
        </div>

        {/* FAQ */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-6">자주 묻는 질문</h2>
          <Accordion alwaysOpen>
            {faqData.length > 0 ? (
              faqData.map((item, index) => (
                <Accordion.Panel key={index}>
                  <Accordion.Title className="!text-lg font-semibold bg-blue-50 hover:bg-blue-100 ">
                    {item.title}
                  </Accordion.Title>
                  <Accordion.Content className="bg-slate-50">
                    <p className="text-gray-600 text-sm">{item.contents}</p>
                  </Accordion.Content>
                </Accordion.Panel>
              ))
            ) : (
              <div className="flex justify-center items-center h-[550px] ">
                <div class="card group hover:shadow w-full">
                  <div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                </div>
              </div>
            )}
            {/* <div className="flex justify-center items-center h-[550px] ">
              <div class="card group hover:shadow w-full">
                <div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <p className="text-3xl"> 사이트 점검중입니다.</p>
                </div>
              </div>
            </div> */}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Faq;
