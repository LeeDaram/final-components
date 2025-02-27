import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#FFD700",
  "#00FFFF",
  "#8A2BE2",
  "#FF4500",
  "#32CD32",
  "#DC143C",
  "#6495ED",
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

        const formattedData = result.map((item, index) => {
          const assignedColor = COLORS[index % COLORS.length];
          console.log(`업종: ${item.industry_name}, 색상: ${assignedColor}`);
          return {
            name: item.industry_name,
            value: item.count,
            color: assignedColor,
          };
        });

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
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="40%"
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || "#000000"}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </div>
  );
};

export default ChartComponent;
