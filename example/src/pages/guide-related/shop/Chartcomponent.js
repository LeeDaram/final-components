import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "식당", value: 70, color: "#FF5733  " }, // 파란색
  { name: "미용실", value: 20, color: "#33FF57  " }, // 빨간색
  { name: "숙소", value: 5, color: "#3357FF  " }, // 노란색
  { name: "기타", value: 5, color: "#FF33A1  " }, // 주황색
  { name: "기타", value: 5, color: "#FFD700  " }, // 주황색
  { name: "기타", value: 5, color: "#00FFFF  " }, // 주황색
  { name: "기타", value: 5, color: "#8A2BE2  " }, // 주황색
  { name: "기타", value: 5, color: "#FF4500  " }, // 주황색
  { name: "기타", value: 5, color: "#32CD32  " }, // 주황색
  { name: "기타", value: 5, color: "#DC143C  " }, // 주황색
  { name: "기타", value: 5, color: "#6495ED  " }, // 주황색
];

const ChartComponent = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">업종별 착한가격업소 현황</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ChartComponent;
