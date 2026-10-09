
/*
 PRDA S&T
 정압설비 정비사례 MASTER DB

 관리 원칙
 1. 실제 확인된 사례만 등록
 2. 회사명, 관리소명, 설비번호 등 비공개 정보 제외
 3. 확정 원인과 추정 원인 구분
 4. 원본 및 출처 보존
 5. 유사사례 중복 여부 확인
 6. 검증되지 않은 정비방법을 확정 조치로 표시 금지
*/

const PRDA_CASES = [];

/*
 신규 사례 등록 양식

 아래 양식은 참고용이며,
 실제 데이터가 등록된 것은 아닙니다.

 {
   id: "PCV-0001",
   manufacturer: "",
   model: "",
   pilot: "",
   equipmentType: "",
   symptom: "",
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
   verificationStatus: "검토 중",
   reference: "",
   relatedManuals: [],
   relatedCases: [],
   publicApproved: false
 }
*/

function validatePRDACase(item) {
  if (!item || typeof item !== "object") {
    return false;
  }

  if (!/^PCV-\d{4,}$/.test(item.id || "")) {
    return false;
  }

  if (!item.symptom || !item.manufacturer) {
    return false;
  }

  if (item.publicApproved !== true) {
    return false;
  }

  return true;
}

function getPublicPRDACases() {
  return PRDA_CASES.filter(validatePRDACase);
}

function findPRDACases(keyword) {
  const query = String(keyword || "")
    .trim()
    .toLowerCase();

  return getPublicPRDACases().filter(function(item) {
    const searchable = [
      item.id,
      item.manufacturer,
      item.model,
      item.pilot,
      item.equipmentType,
      item.symptom,
      item.confirmedCause,
      item.inspection,
      item.action,
      item.result
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}
