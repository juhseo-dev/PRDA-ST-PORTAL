
/* PRDA S&T 정비사례 MASTER DB
   공개 가능 정보만 저장
   설비 태그번호 및 내부정보 제외
*/

const PRDA_CASES = [
  {
    id: "PCV-0001",
    title: "TARTARINI WORK 헌팅 및 후단압 상승",

    manufacturer: "TARTARINI",
    model: "FL/100-SR-SRS",
    size: "6인치",

    equipmentType: "MONITOR & WORK",
    faultPosition: "WORK",
    pilot: "",

    symptom: "WORK 정압기 헌팅 및 후단압 상승",

    operatingConditions: {
      upstreamMPa: null,
      downstreamMPa: null,
      flowTonPerHour: null
    },

    suspectedCauses: [
      "소음기 이상"
    ],

    confirmedCause:
      "소음기 교체 후 증상 해소 확인. " +
      "소음기 내부의 세부 고장형태는 미확인.",

    inspection:
      "정비 전 헌팅 및 후단압 상승 발생. " +
      "세부 점검기록은 원본 확인 필요.",

    action: "소음기(Silencer) 교체",

    replacedParts: [
      "소음기(Silencer)"
    ],

    result:
      "소음기 교체 후 헌팅 및 " +
      "후단압 상승 모두 해소",

    reference:
      "현장 정비결과 사용자 확인. " +
      "상세 원본 보고서 대조 필요.",

    relatedManuals: [],
    relatedCases: [],

    verificationStatus:
      "조치 및 증상 해소 확인 / " +
      "세부 원인·원본 대조 필요",

    /* 공개 승인 전까지 false 유지 */
    publicApproved: false
  }
];

/* 공개 승인 여부 검사 */
function validatePRDACase(item) {
  if (!item || typeof item !== "object") {
    return false;
  }

  if (!/^PCV-\d{4,}$/.test(item.id || "")) {
    return false;
  }

  if (!item.manufacturer || !item.symptom) {
    return false;
  }

  return item.publicApproved === true;
}

/* 공개 승인된 사례만 홈페이지 표시 */
function getPublicPRDACases() {
  return PRDA_CASES.filter(validatePRDACase);
}

/* 공개 정비사례 검색 */
function findPRDACases(keyword) {
  const query = String(keyword || "")
    .trim()
    .toLowerCase();

  return getPublicPRDACases().filter(function(item) {
    const searchable = [
      item.id,
      item.title,
      item.manufacturer,
      item.model,
      item.size,
      item.pilot,
      item.equipmentType,
      item.faultPosition,
      item.symptom,
      item.confirmedCause,
      item.inspection,
      item.action,
      item.result
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}
