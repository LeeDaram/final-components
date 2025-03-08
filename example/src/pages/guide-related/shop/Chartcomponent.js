import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#FF6B6B",
  "#6BFFB3",
  "#6B9EFF",
  "#FF85C1",
  "#FFD166",
  "#73C2FB",
  "#A29BFE",
  "#FF9F43",
  "#45D09E",
  "#FF7F50",
  "#1E90FF",
];

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/shop")
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        return response.json();
      })
      .then((result) => {
        console.log("API 데이터:", result);

        const formattedData = result
          .map((item) => ({
            name: item.industryName,
            value: item.count,
          }))
          .sort((a, b) => b.value - a.value); // 값 기준 내림차순 정렬

        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">업종별 착한가격업소 현황</h2>
      <PieChart width={450} height={450}>
        <Pie
          data={data}
          cx="50%"
          cy="40%"
          outerRadius={120}
          dataKey="value"
          label={false} // 숫자 라벨 숨김
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </div>
  );
};

export default ChartComponent;
