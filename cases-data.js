
/* PRDA S&T 정비사례 MASTER DB
   공개용 데이터 관리
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

    suspectedCauses: [],
    confirmedCause: "",
    inspection: "",
    action: "",
    replacedParts: [],
    result: "",

    reference: "현장 정비기록 원본 확인 필요",
    relatedManuals: [],
    relatedCases: [],

    verificationStatus: "기본정보 확인 / 원인·조치 미검증",

    /* 검증 및 공개 승인 후 true로 변경 */
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
