// {
//     "storeId": 5,
//     "userId": "user05",
//     "industryId": 1,
//     "contact": "02-739-6742",
//     "storeImage": "https://www.goodprice.go.kr/comm/showImageFile.do?fileCours=/bssh/20240913/thumb/&fileId=96A8D4A1BE80405DAFC077E041A9976C.png",
//     "averageRating": 3,
//     "takeOut": "F",
//     "delivery": "F",
//     "wifi": "F",
//     "pet": "F",
//     "kid": "F",
//     "parking": "F",
//     "createdAt": null,
//     "updatedAt": null
// }
function StoreComponent({ data }) {
  return (
    <>
      <h1 className="text-orange-600 font-bold">{data.storeId}</h1>
      <img src={data.storeImage} width={500} height={500} />
    </>
  );
}

export default StoreComponent;
